import React from 'react';
import {Card, CardImg, CardImgOverlay, CardTitle, Breadcrumb, BreadcrumbItem} from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import {baseUrl} from '../shared/baseUrl';

function RenderMenuItem({dishProp}){
    return(
    
        <Card>
            <Link to={`/menu/${dishProp.id}`}>                  
                <CardImg width="100%" src={baseUrl + dishProp.image} alt={dishProp.name}/>
                <CardImgOverlay>
                    <CardTitle>{dishProp.name}</CardTitle>   
                </CardImgOverlay>
            </Link>
        </Card>
   
    );
    }
    const Menu = (props) =>{
        const menu = props.dishProp.dishes.map(dish =>{
            return (
                <div key={dish.id} className="col-12 col-md-5 m-1">
                  <RenderMenuItem dishProp={dish}/>  
                </div>
            )
        })

        if(props.dishProp.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            )
        }
        else if(props.dishProp.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4> {props.dishProp.errMess}</h4>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                        <BreadcrumbItem active>Menu</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>Menu</h3>
                        <hr/>
                    </div>
                </div>
                    <div className="row">
                        
                            {menu}
                        
                    </div>
                    
                    
                </div>
            );
        }
    }
        
    


export default Menu;