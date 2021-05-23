function Blog({ orders, currTime }) {
  return (
    <div>
      <h2>This is blog page: {currTime}</h2>
      {orders && (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.product}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// This function gets called at build time on server-side.
// It won't be called on client-side, so you can even do
// direct database queries. See the "Technical details" section.
//
// Note: function này được call 1 lần lúc build thôi, do đó nếu edit
// thì phải run lại (yarn dev) thì mới có tác dụng.
// Thế nên mới có tên là get static props, do đó trong function này,
// nếu gọi API thì API đó cũng phải là static
//
// In development (next dev), getStaticProps will be called on every request
//
// Because getStaticProps runs at build time, it does not receive data
// that’s only available during request time, such as
// query parameters or HTTP headers as it generates static HTML.
export async function getStaticProps(context) {
  // Call an external API endpoint to get orders.
  // You can use any data fetching library
  const res = await fetch(
    "https://ducdongyyen.com/tlvc-api/api/order/read.php?page=0&size=10"
  );
  const orders = await res.json();
  console.log("[getStaticProps] orders: ", orders.message);
  console.log("curr dir: ", process.cwd());

  if (!orders || orders.message !== "SUCCESS") {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  // By returning { props: { orders } }, the Blog component
  // will receive `orders` as a prop at build time
  return {
    props: {
      orders: orders.data.list,
      currTime: new Date().toLocaleString(),
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 2 seconds
    revalidate: 2, // In seconds
  };
}

export default Blog;
