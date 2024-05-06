/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { formatCurrency, parseCurrency, roundUp } from "../../utils/helper";
import { useUnits } from "./hooks/useUnits";
import { useUpdateProduct } from "./hooks/useUpdateProduct";
import { useCreateProduct } from "./hooks/useCreateProduct";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedProduct } from "./productSlice";
import { useEffect } from "react";

function UpdateProductForm({ form, productToUpdate = {}, setIsOpenModal }) {
  const { units } = useUnits();
  const isUpdateSession = Boolean(productToUpdate.productId);
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { createProduct, isCreating } = useCreateProduct();
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useDispatch();
  const selectedProduct = useSelector((state) => state.product.selectedProduct);

  useEffect(() => {
    if (isUpdateSession) {
      form.setFieldsValue(productToUpdate);
    }
  }, [form, isUpdateSession, productToUpdate]);

  function preventSubmission(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }
  //Update the original price and selling price of the product unit when the base quantity changes based on the first product unit
  function handleBaseQuantityChange(newBaseQuantity, formListItemIndex) {
    const productUnits = form.getFieldValue("productUnits");
    const updatedProductUnits = productUnits.map((productUnit, index) => {
      if (formListItemIndex > 0 && index === formListItemIndex) {
        return {
          ...productUnit,
          baseQuantity: newBaseQuantity,
          originalPrice: roundUp(
            (productUnits[0].originalPrice * newBaseQuantity) /
              productUnits[0].baseQuantity,
          ),
          sellingPrice: roundUp(
            (productUnits[0].sellingPrice * newBaseQuantity) /
              productUnits[0].baseQuantity,
          ),
        };
      }
      return productUnit;
    });
    form.setFieldsValue({
      productUnits: updatedProductUnits,
    });
  }

  function handleIsDefaultChange(isDefault, formListItemIndex) {
    const productUnits = form.getFieldValue("productUnits");
    const updatedProductUnits = productUnits.map((productUnit, index) => {
      if (index === formListItemIndex) {
        return {
          ...productUnit,
          isDefault,
        };
      }
      return { ...productUnit, isDefault: false };
    });
    form.setFieldsValue({
      productUnits: updatedProductUnits,
    });
  }

  function handleFinish(submittedProduct) {
    //Check whether the product has product units
    const hasProductUnit = submittedProduct.productUnits?.length > 0;
    //Check whether the product has a default unit
    if (hasProductUnit) {
      const hasDefaultUnit = submittedProduct.productUnits.some(
        (productUnit) => productUnit.isDefault,
      );
      if (!hasDefaultUnit) {
        modal.error({
          title: "Thiếu thông tin",
          content: "Hãy chọn một đơn vị tính mặc định cho sản phẩm.",
          centered: true,
          okButtonProps: {
            className: "btn-primary",
          },
        });
        return;
      }
    } else {
      modal.error({
        title: "Thiếu thông tin",
        content: "Hãy thêm ít nhất một đơn vị tính cho sản phẩm.",
        centered: true,
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }

    submittedProduct.productUnits = submittedProduct.productUnits.map(
      (productUnit) => {
        return {
          ...productUnit,
          unit: units.find((unit) => unit.unitId === productUnit.unit.unitId),
          isDefault: productUnit.isDefault || false,
        };
      },
    );
    submittedProduct.displayedProductUnit = submittedProduct.productUnits.find(
      (productUnit) => productUnit.isDefault,
    );

    const hasBlankField = submittedProduct.productUnits.some((productUnit) =>
      Object.keys(productUnit).some(
        (key) => key !== "isDefault" && !productUnit[key],
      ),
    );
    if (hasBlankField) {
      modal.error({
        title: "Thiếu thông tin",
        content: "Hãy điền đầy đủ thông tin cho các đơn vị tính.",
        centered: true,
        okButtonProps: {
          className: "btn-primary",
        },
      });
      return;
    }

    //Handle update or create product based on the session
    if (isUpdateSession) {
      updateProduct(
        {
          id: productToUpdate.productId,
          product: submittedProduct,
        },
        {
          onSuccess: () => {
            if (selectedProduct.length > 0) {
              dispatch(setSelectedProduct([submittedProduct]));
            }
            setIsOpenModal(false);
          },
        },
      );
    } else {
      createProduct(submittedProduct, {
        onSuccess: () => {
          form.resetFields();
          setIsOpenModal(false);
        },
      });
    }
  }

  function handleCancel() {
    form.resetFields();
    setIsOpenModal(false);
  }

  return (
    <>
      {contextHolder}
      <Form
        form={form}
        name="updateProductForm"
        onKeyDown={preventSubmission}
        onFinish={handleFinish}
        labelCol={{ span: 7 }}
        initialValues={{ stockQuantity: 0 }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Mã sản phẩm" name="productId">
              <Input
                disabled={!isUpdateSession}
                readOnly={isUpdateSession}
                className="w-[50%]"
                placeholder="Mã tự động"
              />
            </Form.Item>
            <Form.Item
              label="Tên sản phẩm"
              name="productName"
              rules={[{ required: true, message: "Hãy nhập tên sản phẩm." }]}
            >
              <Input allowClear className="w-[80%]" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="Số lượng tồn kho"
              name="stockQuantity"
              tooltip="Số lượng tồn kho tương ứng với đơn vị tính mặc định"
            >
              <InputNumber className="w-[30%]" min={0} max={1000000} />
            </Form.Item>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col span={24}>
            <Collapse
              size="small"
              defaultActiveKey={["1"]}
              items={[
                {
                  key: "1",
                  label: "Đơn vị tính",
                  children: (
                    <Form.Item>
                      <Form.List name="productUnits">
                        {(unitFields, { add: addUnit, remove: removeUnit }) => {
                          return (
                            <>
                              <div className="flex flex-col ">
                                {unitFields.length > 0 && (
                                  <div className="mb-2 flex items-center justify-between font-semibold">
                                    <div className="basis-[10%] ">Đơn vị</div>
                                    <div className="basis-[12%]">
                                      Giá trị cơ bản
                                    </div>
                                    <div className="basis-[20%]">Giá vốn</div>
                                    <div className="basis-[20%]">Giá bán</div>
                                    <div className="basis-[10%]"></div>
                                    <div className="basis-[2%]"></div>
                                  </div>
                                )}
                                {unitFields.map((unitField) => {
                                  return (
                                    <div
                                      className="flex items-center justify-between"
                                      key={unitField.key}
                                    >
                                      <Form.Item
                                        className="basis-[10%]"
                                        name={[
                                          unitField.name,
                                          "unit",
                                          "unitId",
                                        ]}
                                      >
                                        <Select
                                          options={units?.map((unit) => ({
                                            key: unit.unitId,
                                            value: unit.unitId,
                                            label: unit.unitName,
                                          }))}
                                        ></Select>
                                      </Form.Item>
                                      <Form.Item
                                        className="basis-[12%]"
                                        name={[unitField.name, "baseQuantity"]}
                                      >
                                        <InputNumber
                                          className="w-full"
                                          min={0}
                                          max={1000000}
                                          onChange={(value) =>
                                            handleBaseQuantityChange(
                                              value,
                                              unitField.name,
                                            )
                                          }
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        className="basis-[20%]"
                                        name={[unitField.name, "originalPrice"]}
                                      >
                                        <InputNumber
                                          className="w-full"
                                          formatter={formatCurrency}
                                          parser={parseCurrency}
                                          min={0}
                                          max={1000000000}
                                          addonAfter="VND"
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        className="basis-[20%]"
                                        name={[unitField.name, "sellingPrice"]}
                                      >
                                        <InputNumber
                                          className="w-full"
                                          formatter={formatCurrency}
                                          parser={parseCurrency}
                                          min={0}
                                          max={1000000000}
                                          addonAfter="VND"
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        className="basis-[10%]"
                                        name={[unitField.name, "isDefault"]}
                                        valuePropName="checked"
                                      >
                                        <Checkbox
                                          onChange={(e) =>
                                            handleIsDefaultChange(
                                              e.target.checked,
                                              unitField.name,
                                            )
                                          }
                                        >
                                          Mặc định
                                        </Checkbox>
                                      </Form.Item>
                                      <Form.Item className="basis-[2%]">
                                        <CloseOutlined
                                          onClick={() =>
                                            removeUnit(unitField.name)
                                          }
                                        />
                                      </Form.Item>
                                    </div>
                                  );
                                })}

                                <Button
                                  className="w-[150px]"
                                  onClick={() => addUnit()}
                                >
                                  + Thêm đơn vị tính
                                </Button>
                              </div>
                            </>
                          );
                        }}
                      </Form.List>
                    </Form.Item>
                  ),
                },
              ]}
            ></Collapse>
          </Col>
        </Row>
        <Form.Item className="mt-5 text-right">
          <Space>
            <Button onClick={handleCancel}>Hủy</Button>
            <Button
              type="primary"
              htmlType="submit"
              className="btn-primary"
              loading={isCreating || isUpdating}
            >
              {isUpdateSession ? "Cập nhật" : "Thêm mới"}
            </Button>
          </Space>
        </Form.Item>
      </Form>
    </>
  );
}

export default UpdateProductForm;
