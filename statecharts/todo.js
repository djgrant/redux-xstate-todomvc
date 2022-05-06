import { Machine } from "xstate";

export default new Machine({
  initial: "view",
  states: {
    edit: {
      on: {
        SAVE_TODO: "view"
      }
    },
    view: {
      on: {
        DOUBLE_CLICK_TODO: "edit"
      },
      initial: "incomplete",
      states: {
        complete: {
          on: {
            CLICK_CLEAR_COMPLETED: "incomplete",
            TICK_COMPLETE_TODO: "incomplete"
          }
        },
        incomplete: {
          on: {
            TICK_COMPLETE_TODO: "complete",
            TICK_COMPLETE_ALL: "complete"
          }
        }
      }
    }
  }
});
