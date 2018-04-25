# Changelog

Changelog for the BBSRC project.

## 0.0.2 - 2018-04-25
### Added
    - Second release of the BBSRC project following Sprint 2
    - Simplified and improved the deployment process
      - Created a [production](https://github.com/cns-iu/bbsrc/tree/production) branch which holds the latest production build without a Docker requirement
    - Improved results pane
      - Now shows total # results
      - Updates itself as the filters are updated
      - Data is ordered by reverse chronological order
    - Set the actual min/max for year filter
    - Database optimizations
      - Now including non-science-mapped publications
    - Science Map improvements
      - Now showing non-science-mapped (unclassified) on the map
      - All multidisciplinary journals now fall into one 'Multidisciplinary' Discipline at the bottom left of the map
    - Improved help text in the UI
    - Fixed filter dropdown bug
### Known Issues
    - Full-text searching is limited to the publication's title and the associated grant's title
    - Full-text searching uses a simple substring (like SQL's ILIKE) matching algorithm

## 0.0.1 - 2018-04-10
### Added
    - First release of the BBSRC project following Sprint 1!
    - Science Mapped BBSRC journal publications and integrated them
    - Added the science mapped publications to the Science Map
    - Created a set of filters to filter the publications and update the map and results pane
    - Created a results pane to display relevant publications when clicking a subdiscipline on the Science Map.
    - Documented installation and deployment
