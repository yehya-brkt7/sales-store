import Breadcrumb from "react-bootstrap/Breadcrumb";
import Link from "next/link";

function BreadcrumbExample({ productdetail }) {
  return (
    <Breadcrumb>
      <Breadcrumb.Item>
        <Link href="/">Products</Link>
      </Breadcrumb.Item>
      <Breadcrumb.Item active>{productdetail.name}</Breadcrumb.Item>
    </Breadcrumb>
  );
}

export default BreadcrumbExample;
