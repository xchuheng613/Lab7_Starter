# Lab 7

## Group Members
- Chuheng Xi

---

## Question 1 
I will run them within GitHub Action whenever code is pushed. This automated testing is part of the CI workflow which gives fast and consistent feedback every time someone pushes/changes code. This automated testing provides benefits such as scalability, early detection of errors (so we don't develop on incorrect code), enforced code quality, as well as a consistent environment. 

## Question 2
No, _E2E_ tests are used to check the functionality of the entire application from the user's perspective. Verifying the return values of individual functions are better handled by unit tests. 

## Question 3
**Navigation mode** runs the full page load sequence from a blank tab. It then evaluates the performance, accessibility, SEO, etc. on the resulting load. It's useful for an overall performance metric, but not very good for evaluating interactions or changes in content. It's usually used to measure the metric of _how fast and robust my page is when the user first lands here_.

**Snapshot mode** freezes the current DOM and runs static checks (accessibility issues, color contrast, alt text, etc.). Unlike navigation mode, snapshot mode doesn't run performance metrics tied to loading or JS execution. It's useful for simulating interactions or when we want to perform quick checks without waiting for a full performance run. 

## Question 4
1. html lacks _lang_ attribute, hurts SEO
2. No meta description, hurts SEO, search engine display whatever excerpt they guess
3. Properly size images (product photos are at higher resolution than CSS box that displays them), possibly use responsive images