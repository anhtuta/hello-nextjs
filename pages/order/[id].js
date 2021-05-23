import { useRouter } from "next/router";

export default function Post({ id, orders }) {
  const router = useRouter();

  // If the page is not yet generated, this will be displayed
  // initially until getStaticProps() finishes running
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>This is {id} page</h2>;
      {orders && (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>{order.product} - {order.name} - {order.status}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

// This gets called on every request
// getServerSideProps only runs on server-side and never runs on the browser
// 
export async function getServerSideProps(context) {
  const id = context.params.id;
  let product = "";
  if (id === "may-loc-kk") product = "Máy lọc không khí";
  else if (id === "tlvc") product = "Đỉnh thất lân vờn cầu";
  else if (id === "luc-binh") product = "Lục bình";

  // Fetch data from external API
  const res = await fetch(
    encodeURI(`https://ducdongyyen.com/tlvc-api/api/order/read.php?product=${product}`)
  );
  const json = await res.json();

  if (!json || json.message !== "SUCCESS") {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  // Pass data to the page via props
  return { props: { orders: json.data.list, id } };
}
