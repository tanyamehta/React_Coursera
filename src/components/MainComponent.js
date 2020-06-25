import React, { Component } from 'react';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import Home from './HomeComponent';
import Contact from './ContactComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import About from './AboutComponent';
import { postComment, fetchDishes, fetchComments, fetchPromos, fetchLeaders, postFeedback } from '../redux/ActionCreators';
import { actions } from 'react-redux-form';
import {TransitionGroup, CSSTransition } from 'react-transition-group';

const mapStateToProps = state =>{
  return {
    dishes : state.dishes,
    promotions : state.promotions,
    leaders : state.leaders,
    comments : state.comments
  }
}

const mapDispatchToProps = (dispatch) =>({
  postFeedback : (feedback) => dispatch(postFeedback(feedback)),
  postComment : (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment)),
  fetchDishes : () => {dispatch(fetchDishes())},
  resetFeedbackForm : () => {dispatch(actions.reset('feedback'))},
  fetchComments : () => {dispatch(fetchComments())},
  fetchPromos : () => {dispatch(fetchPromos())},
  fetchLeaders : () => {dispatch(fetchLeaders())}
});


class Main extends Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
    this.props.fetchLeaders();
  }

  render(){
    const HomePage = () =>{
      return (
        <Home dishProp={this.props.dishes.dishes.filter((dish)=>dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMsg={this.props.dishes.errMess}
          promotionProp ={this.props.promotions.promotions.filter(promotion => promotion.featured)[0]}
          promosLoading={this.props.promotions.isLoading}
          promosErrMsg={this.props.promotions.errMess}
          leaderProp ={this.props.leaders.leaders.filter(leader => leader.featured)[0]}
          leadersLoading={this.props.leaders.isLoading}
          leadersErrMsg={this.props.leaders.errMess}
        />
      );
    }

    const DishWithId = ({match}) =>{
      return(
        <DishDetail dishProp={this.props.dishes.dishes.filter(dish=>dish.id === parseInt(match.params.dishId,10))[0]}
          isLoading={this.props.dishes.isLoading}
          errMsg={this.props.dishes.errMess}
          commentProp={this.props.comments.comments.filter(comment => comment.dishId ===parseInt(match.params.dishId,10))}
          commentsErrMsg={this.props.comments.errMess}
          postComment = {this.props.postComment}
        />
      );
    }

    const Leader = () =>{
      return(
        <About leaders={this.props.leaders.leaders}
          isLoading={this.props.leaders.isLoading}
          errMsg={this.props.leaders.errMess}
        />
      )
    }

  return (
    <div>
      <Header/>
      <TransitionGroup>
        <CSSTransition key={this.props.location.key} classNames="page" timeout={300}>
          <Switch>
            <Route path="/home" component={HomePage}/>
            <Route exact path="/menu" component={()=><Menu dishProp={this.props.dishes}/>}/>
            <Route path="/menu/:dishId" component={DishWithId} />
            <Route path="/aboutus" component={Leader}/>
            <Route exact path="/contactus" component={()=><Contact resetFeedbackForm= {this.props.resetFeedbackForm} postFeedback={this.props.postFeedback}/>}/>
            <Redirect to="/home"/>
          </Switch>
          </CSSTransition>
      </TransitionGroup>
      <Footer/>
    </div>
  );
}}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
