import React from 'react';
import { Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const BreadCrumb = (props) => {
    return (
        <Breadcrumb>
            {
                props.data ? props.data.map((item, ind) => {
                    if (item.link) {
                        return <BreadcrumbItem key={ind} active={item.active}><Link id={item.id} to={item.href}>{item.label}</Link></BreadcrumbItem>
                    } else {
                        return <BreadcrumbItem key={ind} active={item.active}>{item.label}</BreadcrumbItem>
                    }
                }) : null
            }
        </Breadcrumb>
    )
}

export default BreadCrumb;