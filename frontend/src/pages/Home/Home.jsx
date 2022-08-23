import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Col, Row } from 'antd';
import Product from '../../components/Product';
import LayoutApp from '../../components/Layout';
import { useDispatch } from 'react-redux';
import './home.css'

const API_URL = `${process.env.REACT_APP_API_URL}api/v1/`;

const Home = () => {

    const dispatch = useDispatch();

    const [productData, setProductData] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("phones")

    const categories = [
        {
            name: "phones",
            imgUrl: "https://www.pngall.com/wp-content/uploads/2016/03/Smartphone-Download-PNG.png"
        },
        {
            name: "tvs",
            imgUrl: "https://www.kindpng.com/picc/m/175-1755386_samsung-smart-tv-tvs-png-transparent-png.png"
        },
        {
            name: "laptops",
            imgUrl: "https://www.pngmart.com/files/7/HP-Laptop-PNG-HD.png"
        },
        {
            name: "watches",
            imgUrl: "https://www.kindpng.com/picc/m/193-1939793_most-popular-smartwatches-samsung-galaxy-watch-hd-png.png"
        }
    ]

    useEffect(() => {
        const getAllproducts = async () => {
            try {
                dispatch({
                    type: "SHOW_LOADING"
                })
                const { data } = await axios.get(`${API_URL}`)
                setProductData(data);
                dispatch({
                    type: "HIDE_LOADING"
                })
                console.log(data);

            } catch (error) {
                dispatch({
                    type: "HIDE_LOADING"
                })
                
                console.log(error);
            }
        }
        getAllproducts();
    }, [])

    return (
        <LayoutApp>
            <div>
                <div className="category">
                    {categories.map((category) => (
                        <div className={`categoryFlex ${selectedCategory === category.name && 'category-active'}`} onClick={() => setSelectedCategory(category.name)}>
                            <img src={category.imgUrl} alt={category.name} />
                            <h3 className="categoryName">{category.name}</h3>
                        </div>
                    ))}
                </div>

                <Row>
                    {productData.filter(product => product.category === selectedCategory).map(product => (
                        <Col xs={24} sm={12} mde={12} lg={8} >
                            <Product product={product} />
                        </Col>
                    ))}
                </Row>
            </div>
        </LayoutApp>
    );
};

export default Home;