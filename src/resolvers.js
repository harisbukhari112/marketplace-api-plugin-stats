export default {
	Query: {
		async marketPlaceStats(parent, args, context, info) {
			console.log("This is the analytics api.");
			let { Orders, Products } = context.collections;

			// total amout purchased from marketplace
			let totalAmount = await Orders.aggregate( [
				{ 
					$project: { 
						_id: '1',
						"Amount": {
							$sum: "$payments.amount"
						} 
					},
				},
				{
					$group: {
						_id: '1',
						totalAmount: { $sum : "$Amount" }
					}
					 
				}
			]).toArray();

			// total products purchased from marketplace
			let totalProducts = await Orders.countDocuments({});

			// average of amount purchased from marketplace
			let avgAmount = await Orders.aggregate([
				{ 
					$project: { 
						_id: '1',
						"Amount": {
							$sum: "$payments.amount"
						} 
					},
				},
				{
					$group: {
						_id: '1',
						avgAmount: { $avg : "$Amount" }
					}
					 
				}
			]).toArray();

			let totalProductViews = await Products.aggregate([
				{ 
					$match : { type : "simple" }
				},
				{
					$project: {
						_id: '1',
						"totalViews": { $sum : "$productViews" }
					}
				},
				{
					$group: {
						_id: '1',
						totalViews: { $sum : "$totalViews" }
					}
				}
			]).toArray();

			console.log("totalAmount", totalAmount, "totalProducts", totalProducts, "avgAmount", avgAmount, "totalProductViews", totalProductViews)
			return {
				totalProducts,
				totalAmount: totalAmount?.[0]?.totalAmount,
				avgAmount: avgAmount?.[0]?.avgAmount,
				totalViews: totalProductViews?.[0]?.totalViews
			}
		}
	}
}