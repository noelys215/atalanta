// First, we must import the schema creator
import createSchema from 'part:@sanity/base/schema-creator';

// Then import schema types from any plugins that might expose them
import schemaTypes from 'all:part:@sanity/base/schema-type';
import accessories from './accessories';

import order from './order';
import orderItem from './orderItem';
import paymentResult from './paymentResult';
import shippingAddress from './shippingAddress';
import user from './user';

import womensTops from './womens/womensTanks';
import womenShoes from './womens/womensShoes';
import womensShirts from './womens/womensShirts';
import womensPants from './womens/womensPants';
import womensShorts from './womens/womensShorts';
import womensJackets from './womens/womensJackets';

import mensTanks from './mens/mensTanks.ts';
import mensShirts from './mens/mensShirts';
import mensShorts from './mens/mensShorts';
import menShoes from './mens/menShoes';
import mensJackets from './mens/mensJackets';
import mensPants from './mens/mensPants';

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
	// We name our schema
	name: 'default',
	// Then proceed to concatenate our document type
	// to the ones provided by any plugins that are installed
	types: schemaTypes.concat([
		/* Your types here! */
		user,
		order,
		orderItem,
		paymentResult,
		shippingAddress,

		womensTops, //Tanks
		womensShirts,
		womensJackets,
		womensShorts,
		womensPants,
		womenShoes,

		mensTanks,
		mensShirts,
		mensJackets,
		mensShorts,
		mensPants,
		menShoes,

		accessories,
	]),
});
