import {
    Global 
}
from '@emotion/react';
const globalStyles=` .pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    pointer-events: auto;
    cursor: pointer;
    list-style:none;
   s 
}
.pagination li a{
    display: inline-block;
    margin: 0 10px;
    border: 1px solid orange;
    padding: 10px;
    border-radius:5px;
    background-color:#FFFFCE;
    cursor: pointer;
    pointer-events: auto;
    font-weight:bold;
}
.pagination li a.active{
    color: black;
    bg-color:orange;
}
.pagination li.hover{
    background-color:orange;
}
.pagination li.clicked{
    background-color:orange;
    color:orange;
}
.pagination__link--active {
    color: #DD6B20;
}
.pagination__link--disabled {
    opacity: 0.5;
    pointer-events: none;
}
` 
const GlobalStyles = () => <Global styles={
   globalStyles
}
/>;
export default GlobalStyles;
