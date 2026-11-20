
from datetime import datetime, timezone


def generate_bug_report(test_data: dict):
    """
    Generate bug reports from failed automated tests.
    """

    results = test_data.get("results", [])

    bugs = []

    for test in results:
        if test.get("status") == "failed":
            bugs.append({
                "title": test.get("name", "Unknown Test Failure"),
                "description": test.get(
                    "message",
                    "No additional information available."
                ),
                "severity": "medium",
                "status": "open"
            })

    return {
        "website_url": test_data.get("url"),
        "generated_at": datetime.now(timezone.utc).isoformat(),
        "total_bugs": len(bugs),
        "bugs": bugs
    }
