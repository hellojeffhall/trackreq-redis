(function(){

  var requests_array = [
    {
      id      : 123 ,
      time_ms : 1449966406066 
    }, 
    {
      id      : 456,
      time_ms : 1449976406166 
    }, 
    {
      id      : 789 ,
      time_ms : 1449986406266 
    }, 
  ];
  var app = document.querySelector('.app');
  console.log(app);

  var Dashboard = React.createClass({
    render : function() {
      console.log('PROPS' + this.props);
      var request_li_array = this.props.requests_array.map( function( temp ) {
        return (<li>{temp.id}</li>);
      });
      console.log('ELs ARRAY ' + request_li_array) ;

      return (
        <div className='container' >
          <div className='list_area'>
            <ol>
              {request_li_array} 
            </ol>
          </div>
        </div> 
      );
    }
  });

  ReactDOM.render( 
    <Dashboard
      requests_array={requests_array} 
    /> , app 
  ); 
})();
