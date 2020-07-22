import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { MdAddShoppingCart } from 'react-icons/md';
import { ProductList } from './styles';

import api from '../../services/api';
import { formatPrice } from '../../util/format';
import * as CartActions from '../../store/modules/cart/actions';

export default function Home() {
	const dispatch = useDispatch();
	const [products, setProducts] = useState([]);
	const amount = useSelector((state) =>
		state.cart.reduce((sumAmount, product) => {
			sumAmount[product.id] = product.amount;

			return sumAmount;
		}, {})
	);

	useEffect(() => {
		async function loadProducts() {
			const newProducts = await api.get('/products');
			const data = newProducts.data.map((product) => ({
				...product,
				priceFormatted: formatPrice(product.price),
			}));

			setProducts(data);
		}

		loadProducts();
	}, []);

	function addProduct(id) {
		dispatch(CartActions.addToCartRequest(id));
	}

	return (
		<ProductList>
			{products.map((product) => (
				<li key={String(product.id)}>
					<img src={product.image} alt={product.title} />
					<strong>{product.title}</strong>
					<span>{product.priceFormatted}</span>

					<button type="button" onClick={() => addProduct(product.id)}>
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
