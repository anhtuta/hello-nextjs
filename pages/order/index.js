function Order({ orders }) {
  return (
    <ul>
      {orders.map((order) => (
        <li>{order.product}</li>
      ))}
    </ul>
  )
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch('https://ducdongyyen.com/tlvc-api/api/order/read.php?page=0&size=10')
  const data = await res.json();
  console.log('data: ', data)

  // Pass data to the page via props
  return { props: { orders } }
}

export default Order