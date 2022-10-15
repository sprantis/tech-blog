// Code referenced from Module 14 - Mini Project

module.exports = {
    formatDate: (date) => {
        // Format date as MM/DD/YYYY
        return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
            new Date(date).getFullYear()
        }`;
    },
    ifEquals: function(arg1, arg2, options) {
        if (arg1 == arg2){ return options.fn(this); }
        return options.inverse(this);
    }
};
