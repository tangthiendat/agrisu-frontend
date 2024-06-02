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
  Grid,
  FormInstance,
} from "antd";
import { type Dispatch, type SetStateAction, useEffect } from "react";
import { CloseOutlined } from "@ant-design/icons";
import { formatCurrency, parseCurrency, roundUp } from "../../utils/helper.ts";
import { setSelectedProduct } from "./productSlice.ts";
import { type IProductUnit, type IProduct } from "../../interfaces";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts";
import { useCreateProduct, useUnits, useUpdateProduct } from "./hooks";

interface UpdateProductFormProps {
  form: FormInstance<IProduct>;
  productToUpdate?: IProduct;
  setIsOpenModal: Dispatch<SetStateAction<boolean>>;
}

const { useBreakpoint } = Grid;

const UpdateProductForm: React.FC<UpdateProductFormProps> = ({
  form,
  productToUpdate,
  setIsOpenModal,
}) => {
  const { units } = useUnits();
  const isUpdateSession: boolean = Boolean(productToUpdate.productId);
  const { updateProduct, isUpdating } = useUpdateProduct();
  const { createProduct, isCreating } = useCreateProduct();
  const [modal, contextHolder] = Modal.useModal();
  const dispatch = useAppDispatch();
  const selectedProduct: IProduct[] = useAppSelector(
    (state) => state.product.selectedProduct,
  );
  const screens = useBreakpoint();
  const formItemLayout = screens.lg
    ? {
        labelCol: {
          span: 8,
        },
        wrapperCol: {
          span: 16,
        },
      }
    : null;

  useEffect(() => {
    if (isUpdateSession) {
      form.setFieldsValue(productToUpdate);
    }
  }, [form, isUpdateSession, productToUpdate]);

  //Update the original price and selling price of the product unit when the base quantity changes based on the first product unit
  function handleBaseQuantityChange(
    newBaseQuantity: number,
    formListItemIndex: number,
  ): void {
    const productUnits: IProductUnit[] = form.getFieldValue("productUnits");
    const updatedProductUnits: IProductUnit[] = productUnits.map(
      (productUnit, index) => {
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
      },
    );
    form.setFieldsValue({
      productUnits: updatedProductUnits,
    });
  }

  function handleIsDefaultChange(
    isDefault: boolean,
    formListItemIndex: number,
  ): void {
    const productUnits: IProductUnit[] = form.getFieldValue("productUnits");
    const updatedProductUnits: IProductUnit[] = productUnits.map(
      (productUnit, index) => {
        if (index === formListItemIndex) {
          return {
            ...productUnit,
            isDefault,
          };
        }
        return { ...productUnit, isDefault: false };
      },
    );
    form.setFieldsValue({
      productUnits: updatedProductUnits,
    });
  }

  function handleFinish(submittedProduct: IProduct): void {
    //Check whether the product has product units
    const hasProductUnit: boolean = submittedProduct.productUnits?.length > 0;
    //Check whether the product has a default unit
    if (hasProductUnit) {
      const hasBlankField: boolean = submittedProduct.productUnits.some(
        (productUnit) =>
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
      const hasDefaultUnit: boolean = submittedProduct.productUnits.some(
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

  function handleCancel(): void {
    form.resetFields();
    setIsOpenModal(false);
  }

  return (
    <>
      {contextHolder}
      <Form
        layout={screens.lg ? "horizontal" : "vertical"}
        form={form}
        name="updateProductForm"
        onFinish={handleFinish}
        {...formItemLayout}
        initialValues={{ stockQuantity: 0 }}
      >
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item label="Mã sản phẩm" name="productId">
              <Input
                disabled={!isUpdateSession}
                readOnly={isUpdateSession}
                className="w-[70%]"
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
              label="Tồn kho"
              name="stockQuantity"
              tooltip="Số lượng tồn kho tương ứng với đơn vị tính mặc định"
            >
              <InputNumber className="w-[50%]" min={0} max={1000000} />
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
                    <Form.Item wrapperCol={{ span: 24 }}>
                      <Form.List name="productUnits">
                        {(unitFields, { add: addUnit, remove: removeUnit }) => {
                          return (
                            <>
                              <div className="flex flex-col ">
                                {unitFields.length > 0 && (
                                  <div className="mb-2 flex items-center justify-between font-semibold">
                                    <div className="basis-[12%] ">Đơn vị</div>
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
                                        className="basis-[12%]"
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
                                        />
                                      </Form.Item>
                                      <Form.Item
                                        className="basis-[12%]"
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
        <Form.Item className="mt-5 text-right" wrapperCol={{ span: 24 }}>
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
};

export default UpdateProductForm;
