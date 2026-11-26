
import sqlite3
import json
from pathlib import Path
from datetime import datetime, timezone


# Store the database in the backend directory
DATABASE_PATH = Path(__file__).resolve().parents[1] / "testpilot.db"


def get_connection():
    """Create and return a SQLite database connection."""

    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row

    return connection


def initialize_database():
    """Create the test history table if it does not exist."""

    connection = get_connection()

    try:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS test_runs (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                website_url TEXT NOT NULL,
                created_at TEXT NOT NULL,
                total_tests INTEGER DEFAULT 0,
                passed INTEGER DEFAULT 0,
                failed INTEGER DEFAULT 0,
                results_json TEXT NOT NULL,
                screenshot_path TEXT
            )
        """)

        connection.commit()

    finally:
        connection.close()


def save_test_run(test_data: dict):
    """Save an automated test run in the database."""

    connection = get_connection()

    try:
        created_at = datetime.now(timezone.utc).isoformat()

        cursor = connection.execute("""
            INSERT INTO test_runs (
                website_url,
                created_at,
                total_tests,
                passed,
                failed,
                results_json,
                screenshot_path
            )
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, (
            test_data.get("url", ""),
            created_at,
            test_data.get("total_tests", 0),
            test_data.get("passed", 0),
            test_data.get("failed", 0),
            json.dumps(test_data.get("results", [])),
            test_data.get("screenshot")
        ))

        connection.commit()

        return cursor.lastrowid

    finally:
        connection.close()

 
def get_test_history(limit: int = 20):
    """Retrieve the most recent automated test runs."""

    connection = get_connection()

    try:
        rows = connection.execute("""
            SELECT *
            FROM test_runs
            ORDER BY id DESC
            LIMIT ?
        """, (limit,)).fetchall()

        history = []

        for row in rows:
            test_run = dict(row)

            # Convert stored JSON back into Python data
            test_run["results"] = json.loads(
                test_run.pop("results_json")
            )

            history.append(test_run)

        return history

    finally:
        connection.close()
       
