Day 1 - React Dashboard



Component Tree



App

|

|-- Header

|

|-- Layout

&#x20;   |

&#x20;   |-- Sidebar

&#x20;   |

&#x20;   |-- Main Content

&#x20;       |

&#x20;       |-- Dashboard Overview

&#x20;       |

&#x20;       |-- Message Section

&#x20;       |   |-- Dashboard Message

&#x20;       |   |-- Change Message Button

&#x20;       |

&#x20;       |-- Summary Cards

&#x20;       |   |-- SummaryCard (Total Users)

&#x20;       |   |-- SummaryCard (Total Orders)

&#x20;       |   |-- SummaryCard (Total Sales)

&#x20;       |

&#x20;       |-- Add User Button



Components Description



App.jsx - Main component that combines all other components.



Header.jsx - Displays the dashboard title and welcome message.



Sidebar.jsx - Displays navigation menu items.



SummaryCard.jsx - Reusable component that displays summary information using props.



React Concepts Practiced



Functional Components



JSX



Props



State using useState



Event Handling using onClick



Component Composition



Reusable Components



Responsive CSS



Project Features



Dashboard layout with header and sidebar.



Displays total users, orders and sales.



Add User button increases the user count.



Change Message button updates the dashboard message.



Responsive layout for smaller screens.

