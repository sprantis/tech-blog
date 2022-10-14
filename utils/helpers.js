// Code referenced from Module 14 - Mini Project

module.exports = {
    formatDate: (date) => {
        // Format date as MM/DD/YYYY
        // return date.toLocalDateString();
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            new Date(date).getFullYear()
        }`;
    }
};
