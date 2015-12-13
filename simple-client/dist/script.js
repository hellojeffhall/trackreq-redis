(function () {

  var requests_array = [{
    id: 123,
    time_ms: 1449966406066
  }, {
    id: 456,
    time_ms: 1449976406166
  }, {
    id: 789,
    time_ms: 1449986406266
  }];
  var app = document.querySelector('.app');
  console.log(app);

  var Dashboard = React.createClass({
    displayName: 'Dashboard',

    render: function () {
      console.log('PROPS' + this.props);
      var request_li_array = this.props.requests_array.map(function (temp) {
        return React.createElement(
          'li',
          null,
          temp.id
        );
      });
      console.log('ELs ARRAY ' + request_li_array);

      return React.createElement(
        'div',
        { className: 'container' },
        React.createElement(
          'div',
          { className: 'list_area' },
          React.createElement(
            'ol',
            null,
            request_li_array
          )
        )
      );
    }
  });

  ReactDOM.render(React.createElement(Dashboard, {
    requests_array: requests_array
  }), app);
})();