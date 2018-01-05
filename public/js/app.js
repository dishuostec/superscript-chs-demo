const app = new Vue({
  el: '#app',
  data: {
    conversation: [],
    message: ''
  },
  methods: {
    submit: function () {
      if (this.message.length === 0) {
        return;
      }

      const message = this.message;
      this.message = '';

      fetch("/chat", {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: 'a',
          message: message,
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(data);
          this.addContent(data.text, 'receive');
        })
        .catch(function (res) {
          console.log(res)
        });

      this.addContent(message, 'send');
    },
    addContent: function (message, type) {
      const item = {
        id: Date.now(),
        type: type,
        content: message,
      };

      this.conversation.push(item);

      if (this.conversation.length > 50) {
        this.conversation.shift();
      }

      this.scrollToEnd();
    },
    scrollToEnd: function () {
      const container = this.$el.querySelector("#chat");
      container.scrollTop = container.scrollHeight;
    },
  }
});