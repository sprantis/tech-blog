// Code referenced from Module 14 - Mini Project

module.exports = {
    formatTime: (date) => {
        // Format date as MM/DD/YYYY
        return date.toLocaleDateString();
    },
    formatTime: (time) => {
        // Format time
        return time.toLocalTimeString();
    }
};
