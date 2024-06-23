# Full-Stack Developer Bootcamp Module 05 - Challenge: Kanban (Task) Board

## Table of Contents

- [Description](#description)
- [Install](#install)
- [Usage](#usage)
- [Generator](#generator)
- [Badge](#badge)
- [Credit and Source Code](#credits-and-code-source)
- [Related Efforts](#related-efforts)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [GitHub Pages Location](#github-pages-location)
- [Application Screenshots](#application-screenshots) 


## Description

The Kanban (Task) Board is a browser-based application that empowers Users to effectively visualize and manage their personal and project Tasks

The Kanban Board allows Users to centralize data entry and update of critical "To-Do" items--Tasks---optimizing time management, encouraging collaboration, and moving coordination of shared efforts from over-filled email inbox and Slack channels into a dedicate, functional application.

As developed, the Kanban Tasks are only accessible through a local instance, specific to each accessing computer.

Kanban Board Tasks are held in the Local Storage and, consequently, not currently accessible through the Web.

The Kanban Board source code is published on GitHub, and may be cloned to individual User computers to instantiate local versions.

Kanban Board Tasks are recorded through an integrated entry form availabe on the Board itself , and aggregated and managed in the core Board UI.

The Kanban Board features a dynamic "swim lane"-based organizational structure that permits Tasks to be moved freely, and repeatedly between Status categories (e.g., To Do, In Progress), while Tasks are self-sorted by Title within each swim lane.

The app utlizes an HTML-based Form to ingest User Input, JavaScript to push Tasks to Local Storage, and dynamically update the Kanban Board with new Tasks, while allowing Users to monitor and move Tasks between Status categories based upon Task progress, and CSS to style to site. JavaScript is also used to color-code invididual Tasks based upon the approach or expiration of Task Due Dates.

Because the Kanban Board is held in Local Storage, Task entries will persist across User sessions on individual, hosting computers.


## Installation

The Kanban Board source code may be downloaded from its GitHub repository, and run directly by a hosting computer.

No Installation of the Kanban Board is required; the app is fully browser-based, accessed through any modern browser that supports JavaScript.


## Usage

The Kanban Board is intended for use by one or more Users to record personal and project Tasks that will be held locally, persisting across multiple sessions. 

All Users of the Kanban Board on a local computer will have full visibility to all Kanban Board Tasks.


## Credits and Code Source

Code, where referenced from a third-party Source, is noted in Comments accompanying the relevant Code lines.


## License

Copyright <YEAR> <COPYRIGHT Chris Milazzo>


MIT License

Copyright (c) 2024 MeanderingBrook

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Badges

N / A


## Features

N / A


## How to Contribute

N / A


## Tests

JavaScript-created Kanban Board presentation of Task entries as &lt;ul&gt; to confirm taskList (Array) update.

`console.log` output of new Tasks and their properties, and taskList on Task submittal; see script.js.


## GitHub Pages Location

https://meanderingbrook.github.io/04_Challenge_Personal-Blog/


## Application Screenshots

![Kanban Board: Populated Board Screenshot](./assets/images/Kanban-Board-Populated-Board.png?raw=true "Kanban Board: Populated Board")

![Kanban Board: New Task Entry Form](./assets/images/Kanban-Board-New-Task-Entry-Form.png?raw=true "Kanban Board: New Task Entry Form")