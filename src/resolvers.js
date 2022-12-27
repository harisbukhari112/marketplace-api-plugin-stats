export default {
	Query: {
		async totalProductsPurchased(parent, args, context, info) {
			console.log("This is the analytics api.");
			let { Orders } = context.collections;
			let totalProductPurchased = await Orders.aggregate( [
				// { 
				// 	$project: { 
						
				// 		average: {
				// 			$avg: "$payments.amount"
				// 		} 
				// 	},
				// }
				{
					$project: {
						average: {
							$avg: "$payments.amount"
						}
					} 
				}
			]).toArray();
			console.log("totalProductPurchased", totalProductPurchased)
		}
	}
}