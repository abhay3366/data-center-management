# Data Centre Access Request Wizard

A **React multi-step form** to manage data centre access requests, including branch selection, requester details, visitor information, and email notification.

---

## Table of Contents

1. [Overview](#overview)
2. [Features](#features)
3. [Steps](#steps)
4. [Component Structure](#component-structure)
5. [State Management](#state-management)
6. [Usage](#usage)

---

## Overview

The **AccessFormWizard** component provides a **step-by-step workflow** to collect:

* Branch information
* Requester details
* Visitor details
* Email notification details

The final step allows **submission** and saves the request in **localStorage**.

---

## Features

* Multi-step wizard with **progress indicator**
* Validations at each step before moving forward
* Dynamic visitor and material fields
* Auto-fills email message body based on inputs
* Local storage persistence for requests
* Email sending functionality (placeholder, can be integrated with backend)

---

## Steps

### Step 1: Branch Selection

* Dropdown to select the branch.
* **Next** button is disabled until a branch is selected.

### Step 2: Recipient details + Recipient Details

* **Recipient Details**: Name, Mobile, Email, Company, Approval Authority
* **Email Details**:

  * **From Email** (auto-filled from Recipient email, read-only)
  * **To** (comma-separated)
  * **CC** (comma-separated)

### Step 3: Visitors

* Add multiple visitors with details: Name, Mobile, Aadhar,Purpose of Visit Visit Date, Visit Time
* Add or remove **returnable materials** for each visitor
* Dynamic visitor and material management

### Step 4: Message Body

* Editable **email body** auto-filled based on step 1-3 data

### Step 5: Submit

* Shows final confirmation
* Clicking **Submit** stores the data in `localStorage` and sends notification

---

## Component Structure

```
AccessFormWizard
├─ Step Indicator (1-5)
├─ Step 1: Branch
├─ Step 2: Requester + Email
├─ Step 3: Visitors
├─ Step 4: Message Body
└─ Step 5: Submit
```

---

## State Management

* `step`: current wizard step
* `branch`: selected branch
* `requester`: object storing requester details
* `visitors`: array of visitor objects with nested materials
* `emailFields`: object storing `to`, `cc`, and `body`

---

## Usage

```jsx
import React from "react";
import AccessFormWizard from "./AccessFormWizard";

export default function App() {
  return (
    <div>
      <AccessFormWizard />
    </div>
  );
}
```

---

## Notes

* Validations prevent moving to the next step if required fields are missing.
* `localStorage` is used to persist submitted requests: `localStorage.getItem("accessRequest")`
* The **message body** in Step 4 is auto-generated but editable.
