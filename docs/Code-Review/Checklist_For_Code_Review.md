# Checklist for Code Review

## The Pull Request Process:

Once the branch is ready to merge in the master, a PR should be created for that and on the mean time the task from **in Progress**  will be moved to **Reviewed** on the kanboard.
Then the **request for changes** will be initiated on the same PR by adding comments to the PR, and have discussion related to that. Once the is changes the done, it's again committied on the same branch and the PR is updated accordingly.
Once all the suggestions/reviews are done, than **Approved** status is given to that PR, and it's moved from to **Done** tasks on the board.
Below is the rough draft of what's happening actually in terms of github.

![PR Process](/public/img/pr_process.png)

## Code Guidlines
To maintain code review standards across developers, it's a good idea to have guidelines for what to focus on in code reviews. Here's what we recommend focusing on:

**Functionality:** Does the code behave as the PR author likely intended? Does the code behave as users would expect?
**Complexity:** Would another developer be able to easily understand and use the code?
**Tests:** Does the PR have correct and well-designed automated tests?
**Naming:** Are names for variables, functions, etc. descriptive?
**Comments:** Are the comments clear and useful?
**Documentation:** Did the author also update relevant documentation?
Developers shouldn't spend their time reviewing things that can be automatically checked. Like for the pdf files or .md files, there's no need for this check list as it is specifically for the Dev tasks.

