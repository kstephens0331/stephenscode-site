---
title: "The Cybersecurity Checklist Your Cyber Insurance Carrier Is Actually Grading You On"
metaTitle: "Cybersecurity Checklist for Cyber Insurance"
date: "2026-07-27"
author: "Kyle Stephens"
excerpt: "Cyber insurance underwriting has quietly turned into a technical audit. Here's the checklist carriers are actually scoring in 2025-2026, and why having a control isn't the same as having it enforced."
category: "Business"
tags: ["cyber insurance", "cybersecurity", "MFA", "EDR", "backups", "incident response", "compliance", "small business", "Houston"]
readTime: "10 min read"
---

## The Application Isn't the Test Anymore

For years, getting cyber insurance meant filling out a questionnaire and checking boxes. Do you have antivirus? Check. Do you back up your data? Check. Nobody verified any of it, so a lot of small businesses checked boxes that weren't entirely true and never got caught.

That era is over. Carriers like At-Bay and Coalition now run their own external scans of your network during underwriting, and they keep scanning after the policy is bound. If what they find doesn't match what you attested to on the application, you can end up with a declined renewal, or worse, a denied claim after an actual incident, even though the underlying loss was real and covered on paper.

I work with small and mid-sized Houston-area businesses on the IT side of this problem, and I'm seeing the same pattern over and over: a business owner assumes they're covered because they bought a policy, then finds out during a claim that "having" a control and having it actually enforced are two very different things in an underwriter's eyes. This post is the checklist I'd walk a 10-50 person business through before they renew or apply for cyber coverage in 2026.

## How Insurers Actually Score You

One cyber insurance advisory firm, SeedPod Cyber, lays out a simple scoring model that lines up with what most carriers are doing informally: score yourself against 10 core controls. Have 9 or 10 in place and you're in competitive territory for pricing and terms. Have 6 to 8 and you'll likely still get quoted, but with conditions attached, sublimits on ransomware payouts, or coinsurance requirements. Have 5 or fewer and decline is the likely outcome.

That framework is worth keeping in your head as you read the rest of this, because the checklist below is organized the same way carriers think about it: near-universal requirements first, then the controls that are rapidly becoming table stakes, then the extras that help you negotiate better terms.

If you want a third party to tell you honestly where you land on this scale before a carrier does, that's exactly what a [security assessment](/msp/security-assessment) is for. It's a lot cheaper to find your gaps yourself than to find them in a claim denial letter.

## Tier 1: Miss One of These and Expect a Decline

**Multi-factor authentication, enforced everywhere.** This is the single most universal item on any carrier's list, cited in industry surveys as required by roughly 96% of carriers now. The catch is the word "enforced." MFA needs to be mandatory on email, VPN, remote desktop access, every cloud application, and especially admin accounts, not optional or "available if the user turns it on." The two gaps that trip up businesses during underwriting scans: break-glass admin accounts that quietly bypass MFA, and legacy mail protocols like POP/IMAP left enabled, which let attackers skip MFA entirely through the back door. Insurers want to see identity-provider enforcement reports, not a policy document that says MFA is encouraged. This is exactly what proper [Microsoft 365 conditional access configuration](/msp/microsoft-365-management) is built to close.

**EDR, not legacy antivirus.** Underwriters explicitly separate endpoint detection and response from traditional signature-based antivirus, and in most 2025-2026 applications, plain antivirus no longer qualifies at all. EDR needs to be running on every workstation and server, ideally paired with 24/7 monitoring so alerts actually get triaged instead of piling up in a dashboard nobody watches.

**Backups with an offline or immutable copy, plus tested restores.** The standard here is 3-2-1: three copies of your data, on two types of media, with one copy offline or immutable so ransomware can't reach and encrypt it along with everything else. Here's the part that catches people off guard: a completed backup job is not proof of anything to an insurer. They want evidence of periodic test restores, quarterly is the commonly cited cadence, because a backup nobody has ever restored from is a theory, not a safety net. Also worth knowing: OneDrive, Dropbox, and Google Drive sync are explicitly called out as not qualifying as real backup. [Cloud backup done right](/msp/cloud-backup) includes the monitoring and restore testing that turns a backup job into actual proof.

**A written incident response plan, tested within the last year.** Not a policy statement, an actual playbook with named roles and a decision tree for the first 24 to 72 hours of an incident. Carriers want to see it's been run through a tabletop exercise in the last 12 months, with an agenda and after-action notes to prove it happened.

**Email security plus recurring phishing training.** Two separate requirements that get lumped together: a modern email filtering gateway, and ongoing simulated phishing tests with tracked completion rates, not a single annual training video. Phishing and business email compromise remain the top way ransomware and fraud get into a small business in the first place. The FBI's IC3 data put BEC losses over $2.7 billion in a single year. [Security Essentials](/msp/security-essentials) covers the filtering and phishing-protection side of this.

## Tier 2: Rapidly Becoming Table Stakes

These aren't universal yet, but treat them as coming for your renewal soon, because several are already showing up as conditions on quotes.

- **Patch and vulnerability management with a documented SLA.** Roughly 7-15 days is the commonly cited window for critical vulnerabilities, tighter for anything on CISA's Known Exploited Vulnerabilities list. This requires recurring scanning, not a one-time check.
- **Privileged access management and least privilege.** No standing local admin rights for everyday users, separate accounts for admin tasks, and access that's logged rather than always-on. Gartner has attributed 15-25% of new PAM deployments directly to cyber insurance requirements, which tells you where this is heading.
- **No RDP exposed to the open internet.** One 2024 threat report tied more than half of ransomware incidents to an exposed remote service like RDP. Remote access needs to go through a VPN or zero trust setup, and that access needs MFA too.
- **DMARC set to enforce, not just monitor.** This is the newest item on the list, and it's a smart one for carriers to check because it's publicly verifiable without ever contacting you. A DMARC record sitting at p=none is barely better than no record at all. Moving it to quarantine or reject, alongside proper SPF and DKIM, is increasingly treated as an underwriting condition tied directly to BEC risk.
- **Centralized logging with an actual 24/7 response path.** Logs that sit unreviewed don't count. This can be satisfied through an internal SOC or an outsourced provider, which is the more realistic route for most businesses this size.
- **Vendor risk management.** A basic inventory of critical vendors and their security posture, particularly important if you work with an MSP, since the contract should spell out who owns which security responsibility.
- **Callback verification on wire transfers.** A written policy requiring a callback to a pre-verified phone number before executing any wire transfer or vendor banking change above a set dollar amount. This one lives more in finance than IT, but insurers can and do deny social-engineering fraud claims specifically because a callback step was skipped, even when the fraud itself isn't in dispute. It's the fine print that bites people.

A [complete IT and security bundle](/msp/complete-it) is the fastest way to get most of this tier covered at once: EDR, SIEM monitoring, quarterly vulnerability assessments, and security training in one package rather than assembling it piece by piece.

## Tier 3: Where You Go From Quoted to Competitive

These won't get you declined if you're missing them today, but they're what separates a standard quote from genuinely competitive terms: encryption at rest and in transit for sensitive data, a software inventory if you build or resell software, a formal risk-acceptance process for vulnerabilities you can't patch immediately, and running your own external attack-surface monitoring before a carrier runs theirs and finds something first.

## The One Idea Worth Remembering

Every item on this list comes back to the same distinction: available versus enforced, and attestation versus evidence. A firewall that's installed but misconfigured, an MFA policy that exists but isn't mandatory, a backup job that runs but has never been restored, none of that satisfies an underwriter anymore. What they want is proof: configuration exports, scan reports, restore logs, tabletop after-action reports. The application questionnaire used to be the whole story. Now it's just the cover page.

The gap between "we have that" and "we can prove that" is where most small businesses lose ground on renewal, and it's exactly where a real [compliance and incident-response](/msp/compliance-services) review earns its cost back the first time it prevents a declined claim.

## Where to Start

Don't try to fix all 12-plus items at once. Pull the SeedPod scoring framework, score yourself honestly against the Tier 1 list first, since those five are what actually get policies declined, and work down from there. If you're not sure where you actually stand, that's a conversation worth having before your renewal date, not after a claim gets denied.

If you want a straight answer on where your business scores against this list, [get in touch](/contact) and we'll walk through it together, no sales pressure, just an honest look at what's enforced versus what's just installed.

---

*Kyle Stephens is a Marine Corps veteran and founder of StephensCode, a Houston and Conroe-area IT and web development company. He works with small businesses on the managed IT and cybersecurity side of the business, including getting them ready for cyber insurance underwriting.*
