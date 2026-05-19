"use client";

import { useMemo, useState } from "react";
import styles from "./page.module.css";

type RiskLevel = "Critical" | "High" | "Medium" | "Low";

type Transaction = {
  id: string;
  time: string;
  place: string;
  risk: RiskLevel;
  amount: string;
  channel: string;
  signal: string;
};

const transactions: Transaction[] = [
  {
    id: "TXN-918452",
    time: "23:48",
    place: "Mumbai, IN",
    risk: "Critical",
    amount: "$18,240.00",
    channel: "Wire",
    signal: "Velocity spike across beneficiary accounts",
  },
  {
    id: "TXN-918451",
    time: "23:41",
    place: "Lagos, NG",
    risk: "High",
    amount: "$4,980.20",
    channel: "Card-not-present",
    signal: "New device, foreign IP, high-value merchant",
  },
  {
    id: "TXN-918450",
    time: "23:33",
    place: "New York, US",
    risk: "Medium",
    amount: "$875.16",
    channel: "ATM",
    signal: "Out-of-pattern cash withdrawal",
  },
  {
    id: "TXN-918449",
    time: "23:16",
    place: "Dubai, AE",
    risk: "Critical",
    amount: "$22,600.00",
    channel: "SWIFT",
    signal: "Sanctions-adjacent corridor with mule pattern",
  },
  {
    id: "TXN-918448",
    time: "22:58",
    place: "Austin, US",
    risk: "Low",
    amount: "$128.64",
    channel: "POS",
    signal: "Known customer device and location",
  },
  {
    id: "TXN-918447",
    time: "22:44",
    place: "London, UK",
    risk: "High",
    amount: "$6,510.90",
    channel: "ACH",
    signal: "Dormant account reactivated before payout",
  },
  {
    id: "TXN-918446",
    time: "22:29",
    place: "Toronto, CA",
    risk: "Medium",
    amount: "$1,230.42",
    channel: "Mobile",
    signal: "SIM age mismatch with recent password reset",
  },
  {
    id: "TXN-918445",
    time: "22:12",
    place: "Delhi, IN",
    risk: "High",
    amount: "$3,904.75",
    channel: "UPI",
    signal: "Unusual payee cluster and short session duration",
  },
  {
    id: "TXN-918444",
    time: "21:55",
    place: "Singapore, SG",
    risk: "Low",
    amount: "$242.11",
    channel: "Card",
    signal: "Trusted device, consistent merchant profile",
  },
  {
    id: "TXN-918443",
    time: "21:38",
    place: "Paris, FR",
    risk: "Medium",
    amount: "$990.00",
    channel: "E-commerce",
    signal: "Billing and shipping country mismatch",
  },
  {
    id: "TXN-918442",
    time: "21:24",
    place: "Berlin, DE",
    risk: "Critical",
    amount: "$14,780.50",
    channel: "SEPA",
    signal: "Account takeover probability above threshold",
  },
  {
    id: "TXN-918441",
    time: "21:06",
    place: "Seoul, KR",
    risk: "Medium",
    amount: "$750.08",
    channel: "Mobile",
    signal: "New payee added moments before transfer",
  },
  {
    id: "TXN-918440",
    time: "20:47",
    place: "Johannesburg, ZA",
    risk: "High",
    amount: "$5,430.00",
    channel: "Wire",
    signal: "Round-dollar transfer to newly linked account",
  },
  {
    id: "TXN-918439",
    time: "20:31",
    place: "Chicago, US",
    risk: "Low",
    amount: "$68.23",
    channel: "POS",
    signal: "Normal spend category and location",
  },
  {
    id: "TXN-918438",
    time: "20:18",
    place: "Bangkok, TH",
    risk: "Medium",
    amount: "$1,640.19",
    channel: "ATM",
    signal: "Geo jump after domestic card use",
  },
  {
    id: "TXN-918437",
    time: "19:59",
    place: "Doha, QA",
    risk: "High",
    amount: "$7,800.00",
    channel: "Trade finance",
    signal: "Invoice anomaly and unusual counterparty",
  },
  {
    id: "TXN-918436",
    time: "19:41",
    place: "Sydney, AU",
    risk: "Low",
    amount: "$314.92",
    channel: "Card",
    signal: "Consistent device, merchant, and spend band",
  },
  {
    id: "TXN-918435",
    time: "19:26",
    place: "Sao Paulo, BR",
    risk: "Critical",
    amount: "$31,200.00",
    channel: "Wire",
    signal: "Linked mule network and failed KYC signal",
  },
  {
    id: "TXN-918434",
    time: "19:04",
    place: "Tokyo, JP",
    risk: "Medium",
    amount: "$1,112.40",
    channel: "Online banking",
    signal: "Browser fingerprint drift",
  },
  {
    id: "TXN-918433",
    time: "18:48",
    place: "Amsterdam, NL",
    risk: "Low",
    amount: "$204.17",
    channel: "Card",
    signal: "Expected recurring subscription",
  },
  {
    id: "TXN-918432",
    time: "18:33",
    place: "Mexico City, MX",
    risk: "High",
    amount: "$8,930.65",
    channel: "International transfer",
    signal: "Rapid beneficiary change after login anomaly",
  },
  {
    id: "TXN-918431",
    time: "18:20",
    place: "Istanbul, TR",
    risk: "Medium",
    amount: "$1,870.00",
    channel: "Card-not-present",
    signal: "High-risk merchant category variance",
  },
  {
    id: "TXN-918430",
    time: "18:07",
    place: "Cairo, EG",
    risk: "Low",
    amount: "$92.50",
    channel: "POS",
    signal: "Matched travel notice and trusted device",
  },
  {
    id: "TXN-918429",
    time: "17:52",
    place: "Zurich, CH",
    risk: "Critical",
    amount: "$45,000.00",
    channel: "Private banking",
    signal: "High-risk counterparty with layered transfer path",
  },
];

const riskClassName: Record<RiskLevel, string> = {
  Critical: styles.critical,
  High: styles.high,
  Medium: styles.medium,
  Low: styles.low,
};

const pageSize = 10;

export default function Home() {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(transactions.length / pageSize);
  const start = (page - 1) * pageSize;
  const visibleTransactions = useMemo(
    () => transactions.slice(start, start + pageSize),
    [start],
  );

  const counts = transactions.reduce(
    (acc, transaction) => {
      acc[transaction.risk] += 1;
      return acc;
    },
    { Critical: 0, High: 0, Medium: 0, Low: 0 } satisfies Record<
      RiskLevel,
      number
    >,
  );

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar} aria-label="Main navigation">
        <div className={styles.brand}>
          <span className={styles.brandMark}>FS</span>
          <div>
            <p>FraudSense.ai</p>
            <span>Risk intelligence</span>
          </div>
        </div>

        <nav className={styles.nav}>
          <a className={styles.activeNav} href="#dashboard">
            Dashboard
          </a>
          <a href="#transactions">Transactions</a>
          <a href="#queues">Investigation queues</a>
          <a href="#model">RAG model insights</a>
        </nav>

        <div className={styles.sidebarPanel}>
          <span>Backend status</span>
          <strong>Ready for Python API</strong>
          <p>Frontend is prepared for model scores, explanations, and analyst decisions.</p>
        </div>
      </aside>

      <section className={styles.workspace} id="dashboard">
        <header className={styles.header}>
          <div>
            <span className={styles.eyebrow}>Fraud analyst console</span>
            <h1>FraudSense.ai</h1>
            <p>
              Current-day transaction monitoring with newest activity first and
              risk signals prepared for AI-assisted review.
            </p>
          </div>
          <div className={styles.headerActions}>
            <button type="button">Export</button>
            <button type="button" className={styles.primaryButton}>
              Review queue
            </button>
          </div>
        </header>

        <section className={styles.metrics} aria-label="Risk summary">
          <article>
            <span>Critical</span>
            <strong>{counts.Critical}</strong>
            <p>Immediate review</p>
          </article>
          <article>
            <span>High</span>
            <strong>{counts.High}</strong>
            <p>Needs analyst action</p>
          </article>
          <article>
            <span>Medium</span>
            <strong>{counts.Medium}</strong>
            <p>Monitor closely</p>
          </article>
          <article>
            <span>Low</span>
            <strong>{counts.Low}</strong>
            <p>Auto-clear candidates</p>
          </article>
        </section>

        <section className={styles.tableSection} id="transactions">
          <div className={styles.tableHeader}>
            <div>
              <span className={styles.eyebrow}>Today, May 18 2026</span>
              <h2>Current transactions</h2>
            </div>
            <p>
              Showing {start + 1}-{Math.min(start + pageSize, transactions.length)} of{" "}
              {transactions.length}
            </p>
          </div>

          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Transaction ID</th>
                  <th>Time</th>
                  <th>Place</th>
                  <th>Risk</th>
                  <th>Amount</th>
                  <th>Channel</th>
                  <th>Primary signal</th>
                </tr>
              </thead>
              <tbody>
                {visibleTransactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td className={styles.transactionId}>{transaction.id}</td>
                    <td>{transaction.time}</td>
                    <td>{transaction.place}</td>
                    <td>
                      <span
                        className={`${styles.riskBadge} ${
                          riskClassName[transaction.risk]
                        }`}
                      >
                        {transaction.risk}
                      </span>
                    </td>
                    <td>{transaction.amount}</td>
                    <td>{transaction.channel}</td>
                    <td className={styles.signal}>{transaction.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.pagination} aria-label="Transaction pagination">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <div>
              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    type="button"
                    key={pageNumber}
                    className={pageNumber === page ? styles.currentPage : ""}
                    onClick={() => setPage(pageNumber)}
                    aria-label={`Go to page ${pageNumber}`}
                  >
                    {pageNumber}
                  </button>
                ),
              )}
            </div>
            <button
              type="button"
              onClick={() =>
                setPage((current) => Math.min(totalPages, current + 1))
              }
              disabled={page === totalPages}
            >
              Next
            </button>
          </div>
        </section>
      </section>
    </main>
  );
}
