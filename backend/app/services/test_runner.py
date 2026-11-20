
from pathlib import Path
from uuid import uuid4

from playwright.async_api import (
    async_playwright,
    TimeoutError as PlaywrightTimeoutError
)


async def run_basic_tests(url: str):
    """
    Run basic automated website checks using Playwright
    and capture a screenshot of the website.
    """

    test_results = []
    screenshot_path = None
    response = None

    # Create screenshots directory
    screenshot_dir = (
        Path(__file__).resolve().parents[2] / "screenshots"
    )
    screenshot_dir.mkdir(parents=True, exist_ok=True)

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)

        try:
            page = await browser.new_page()

            # Test 1: Website Loading
            try:
                response = await page.goto(
                    url,
                    wait_until="domcontentloaded",
                    timeout=30000
                )

                test_results.append({
                    "name": "Website Loading",
                    "status": "passed" if response else "failed",
                    "message": (
                        "Website loaded successfully."
                        if response
                        else "No HTTP response received."
                    )
                })

            except PlaywrightTimeoutError:
                test_results.append({
                    "name": "Website Loading",
                    "status": "failed",
                    "message": "Website loading timed out."
                })

            except Exception as error:
                test_results.append({
                    "name": "Website Loading",
                    "status": "failed",
                    "message": str(error)
                })

            # Capture screenshot if navigation succeeded
            if page.url != "about:blank":
                try:
                    screenshot_filename = f"{uuid4().hex}.png"
                    screenshot_file = screenshot_dir / screenshot_filename

                    await page.screenshot(
                        path=str(screenshot_file),
                        full_page=True
                    )

                    screenshot_path = (
                        f"/screenshots/{screenshot_filename}"
                    )

                except Exception as error:
                    print(f"Screenshot capture failed: {error}")

            # Test 2: HTTP Status
            if page.url != "about:blank":
                status_code = response.status if response else None

                test_results.append({
                    "name": "HTTP Status Check",
                    "status": (
                        "passed"
                        if status_code is not None
                        and 200 <= status_code < 400
                        else "failed"
                    ),
                    "message": (
                        f"HTTP status code: {status_code}"
                        if status_code is not None
                        else "Unable to retrieve HTTP status."
                    )
                })

            # Test 3: Page Title
            try:
                title = await page.title()

                test_results.append({
                    "name": "Page Title Check",
                    "status": "passed" if title.strip() else "failed",
                    "message": (
                        f"Page title: {title}"
                        if title.strip()
                        else "The website has no page title."
                    )
                })

            except Exception as error:
                test_results.append({
                    "name": "Page Title Check",
                    "status": "failed",
                    "message": str(error)
                })

            # Test 4: Body Content
            try:
                body_content = await page.locator(
                    "body"
                ).inner_text(timeout=5000)

                test_results.append({
                    "name": "Page Content Check",
                    "status": (
                        "passed" if body_content.strip() else "failed"
                    ),
                    "message": (
                        "Page contains visible text content."
                        if body_content.strip()
                        else "No visible text content found."
                    )
                })

            except Exception as error:
                test_results.append({
                    "name": "Page Content Check",
                    "status": "failed",
                    "message": str(error)
                })

            passed = sum(
                1 for test in test_results
                if test["status"] == "passed"
            )

            failed = sum(
                1 for test in test_results
                if test["status"] == "failed"
            )

            return {
                "success": True,
                "url": url,
                "total_tests": len(test_results),
                "passed": passed,
                "failed": failed,
                "results": test_results,
                "screenshot": screenshot_path
            }

        finally:
            await browser.close()

