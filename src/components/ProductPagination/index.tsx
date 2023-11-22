import { Pagination } from "antd";

const ProductPagination = () => {
    const commonProductPaginationClassPrefix = "common-product-pagination";

    return (
        <div className={`${commonProductPaginationClassPrefix}__wrapper`}>
            <Pagination defaultCurrent={1} showSizeChanger={false} total={80} />
        </div>
    );
};

export default ProductPagination;
