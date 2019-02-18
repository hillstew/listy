export const getIndex = (id, issues) => {
    return issues.findIndex((issue) => issue.id == id);
};

export const createIssuesCopy = (issues) => {
    return issues.slice();
};