import React, { Component } from 'react';
import {Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Modal, ModalHeader, ModalBody, Button, Row, Label} from 'reactstrap';
import {Link} from 'react-router-dom';
import { LocalForm, Control, Errors } from 'react-redux-form';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';
import {FadeTransform, Fade, Stagger} from 'react-animation-components';


    
const maxLength = (len) => (val) => !(val) || (val.length <=len);
const minLength = (len) => (val) => (val) && (val.length >=len);


class CommentForm extends Component{
    constructor(props){
    super(props);
    this.state={
        isModalOpen : false
    }
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit2 = this.handleSubmit2.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOpen: !this.state.isModalOpen
        })
    }

    handleSubmit2(values){
        this.toggleModal();
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }
    render(){
        return(
            
            <div>
                <Button outline onClick={this.toggleModal}>
                            <span className="fa fa-sign-in fa-lg"></span>Submit Comment
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                <div className="m-3">
                    <LocalForm onSubmit={values => this.handleSubmit2(values)}>
                        <Row className="form-group">
                            <Label htmlFor="rating">Rating</Label>
                            <Control.select className="form-control" id="rating" model=".rating">
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Control.select>
                            
                        </Row>
                        <Row className="form-group">
                        <Label htmlFor="yourname">Your Name</Label>
                        
                            <Control.text className="form-control" id="yourname" model=".author" placeholder="Your Name" validators= {{
                                            minLength : minLength(3) , maxLength : maxLength(15)
                                         }
                                         }></Control.text>
                            <Errors className="text-danger" model=".author" show="touched" messages={{
                                
                                minLength: 'Must be 2 characters long',
                                maxLength : 'Must be less than 15 characters'
                            }}>

                            </Errors>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment">Comment</Label>
                            <Control.textarea className="form-control" id="comment" model=".comment" rows="6"></Control.textarea>
                        </Row>
                        <Row className="form-group">
                               
                                    <Button type="submit" color="primary">Submit</Button>
                               
                            </Row>
                    </LocalForm>
                    </div>
                </ModalBody>
            </Modal>

            
            </div>
        )
    }
}
    function RenderDish({dish}){
        if(dish!=null){
            return(
                <FadeTransform in
                tranformProps = {{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                    <Card>
                        <CardImg width="100%" src={baseUrl + dish.image} alt={dish.name}/>
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </FadeTransform>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }

    function RenderComments({comment, postComment, dishId}) {
        if(comment!=null){
            const comm = comment.map(item=>{
                // let date = new Intl.DateTimeFormat('en-US', {
                //     year:'numeric',
                //     month: 'short',
                //     day: '2-digit'
                // }).format(new Date(Date.parse(item.date)))
                return( <ul key={item.id} className="list-unstyled">
                <Stagger in>
                    <Fade in>
                        <li>{item.comment}</li>
                        <li>-- {item.author} {item.date}</li>
                    </Fade>
                </Stagger>
                </ul>);
            })
            return(
                <div>
                    
                    <h4>Comments</h4>
                   {comm}
                   <CommentForm dishId={dishId} postComment={postComment} />
                </div>
            )

        }
        else{
            return(<div></div>)
        }
    }

    const DishDetail = (props) =>{
        
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4> {props.errMess}</h4>
                    </div>
                </div>
            )
        }
        else if(props.dishProp !=null){
        return(
            <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                    <BreadcrumbItem active>{props.dishProp.name}</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>{props.dishProp.name}</h3>
                    <hr/>
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-5 m-1">
                    <RenderDish dish={props.dishProp}/>
                   
                  
                </div>
                <div className="col-12 col-md-5 m-1">
                    <RenderComments comment={props.commentProp}
                        postComment={props.postComment}
                        dishId={props.dishProp.id}
                    />
                   
                  
                </div>
                </div>
                </div>
        )}
        else {
            return (
                <div></div>
            );
        }
    }


export default DishDetail;