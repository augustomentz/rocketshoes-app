import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { bindActionCreators } from 'redux';
import { ProductList } from './styles';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

class Home extends Component {
	constructor() {
		super();
		this.state = {
			products: [],
		};
	}

	componentDidMount() {
		this.loadProducts();
	}

	loadProducts = async () => {
		const newProducts = await api.get('/products');
		const data = newProducts.data.map((product) => ({
			...product,
			priceFormatted: formatPrice(product.price),
		}));

		this.setState({ products: data });
	};

	addProduct = (id) => {
		const { addToCartRequest } = this.props;

		addToCartRequest(id);
	};

	render() {
		const { products } = this.state;
		const { amount } = this.props;

		return (
			<ProductList>
				{products.map((product) => (
					<li key={String(product.id)}>
						<img src={product.image} alt={product.title} />
						<strong>{product.title}</strong>
						<span>{product.priceFormatted}</span>

						<button type="button" onClick={() => this.addProduct(product.id)}>
							<div>
								<MdAddShoppingCart size={16} color="#fff" />{' '}
								{amount[product.id] || 0}
							</div>

							<span>ADICIONAR AO CARRINHO</span>
						</button>
					</li>
				))}
			</ProductList>
		);
	}
}

const mapStateToProps = (state) => ({
	amount: state.cart.reduce((amount, product) => {
		amount[product.id] = product.amount;

		return amount;
	}, {}),
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(CartActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Home);