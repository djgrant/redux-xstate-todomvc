export default {
  initial: "all",
  states: {
    all: {
      on: {
        CLICK_ACTIVE_FILTER: "active",
        CLICK_COMPLETED_FILTER: "completed"
      }
    },
    active: {
      on: {
        CLICK_ALL_FILTER: "all",
        CLICK_COMPLETED_FILTER: "completed"
      }
    },
    completed: {
      on: {
        CLICK_ALL_FILTER: "all",
        CLICK_ACTIVE_FILTER: "completed"
      }
    }
  }
};
