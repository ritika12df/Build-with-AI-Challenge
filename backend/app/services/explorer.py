
from playwright.async_api import (
    async_playwright,
    TimeoutError as PlaywrightTimeoutError
)
from urllib.parse import urlparse
import ipaddress


async def explore_website(url: str):
    parsed_url = urlparse(url)
    hostname = parsed_url.hostname

    if not hostname:
        raise ValueError("Invalid website URL.")

    if hostname.lower() == "localhost":
        raise ValueError("Local websites are not allowed.")

    try:
        ip = ipaddress.ip_address(hostname)

        if not ip.is_global:
            raise ValueError(
                "Private or local IP addresses are not allowed."
            )

    except ValueError as error:
        if str(error) == "Private or local IP addresses are not allowed.":
            raise

    async with async_playwright() as playwright:
        browser = await playwright.chromium.launch(headless=True)

        try:
            page = await browser.new_page()

            response = await page.goto(
                url,
                wait_until="domcontentloaded",
                timeout=30000
            )

            # Get website information
            title = await page.title()
            final_url = page.url

            # Extract links
            links = await page.locator("a").evaluate_all("""
                elements => elements.map(element => ({
                    text: (element.innerText || element.textContent || "").trim(),
                    href: element.href
                }))
                .filter(link => link.href)
                .slice(0, 50)
            """)

            # Extract buttons
            buttons = await page.locator(
                "button, input[type='button'], input[type='submit']"
            ).evaluate_all("""
                elements => elements.map(element => ({
                    text: (
                        element.innerText ||
                        element.textContent ||
                        element.value ||
                        ""
                    ).trim(),
                    type: element.getAttribute("type") || "button"
                })).slice(0, 50)
            """)

            # Extract forms and their fields
            forms = await page.locator("form").evaluate_all("""
                elements => elements.map(form => ({
                    action: form.action,
                    method: (form.method || "get").toUpperCase(),
                    fields: Array.from(
                        form.querySelectorAll("input, textarea, select")
                    ).map(field => ({
                        name: field.name || "",
                        type: field.type || field.tagName.toLowerCase(),
                        placeholder: field.placeholder || ""
                    }))
                })).slice(0, 30)
            """)

            return {
                "success": True,
                "requested_url": url,
                "final_url": final_url,
                "title": title,
                "status_code": response.status if response else None,

                "summary": {
                    "total_links": await page.locator("a").count(),
                    "total_buttons": await page.locator(
                        "button, input[type='button'], input[type='submit']"
                    ).count(),
                    "total_forms": await page.locator("form").count()
                },

                "links": links,
                "buttons": buttons,
                "forms": forms,

                "message": "Website exploration completed successfully!"
            }

        except PlaywrightTimeoutError:
            raise Exception("The website took too long to load.")

        finally:
            await browser.close()

