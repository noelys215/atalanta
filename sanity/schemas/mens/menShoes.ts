export default {
	name: 'mensShoes',
	title: 'Mens Shoes',
	type: 'document',
	fields: [
		{
			name: 'name',
			title: 'Name',
			type: 'string',
		},
		{
			name: 'price',
			title: 'Price',
			type: 'number',
		},
		{
			name: 'category',
			title: 'Category',
			type: 'string',
		},
		{
			name: 'gender',
			title: 'Gender',
			type: 'string',
		},
		{
			name: 'brand',
			title: 'Brand',
			type: 'string',
		},
		{
			name: 'color',
			title: 'Color',
			type: 'string',
		},
		{
			name: 'inventory',
			title: 'Inventory',
			type: 'array',
			of: [
				{
					type: 'object',
					fields: [
						{
							title: 'Size',
							name: 'size',
							type: 'number',
						},
						{
							title: 'Quantity',
							name: 'quantity',
							type: 'number',
						},
					],
				},
			],
		},
		{
			name: 'image',
			title: 'Image',
			type: 'array',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true,
					},
				},
			],
		},
		{
			name: 'description',
			title: 'Description',
			type: 'text',
		},
		{
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'name',
				maxLength: 96,
			},
		},
	],
};
