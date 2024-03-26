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
  Row,
  Select,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import { useUnits } from "./useUnits";
import { useProductTypes } from "./useProductTypes";
import { roundUp } from "../../utils/helper";

function UpdateProductForm({ form, onFinish, setIsOpenModal }) {
  const { units } = useUnits();
  const { productTypes } = useProductTypes();

  function preventSubmission(e) {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  }
  //Update the original price and selling price of the product unit when the base quantity changes based on the first product unit
  function handleBaseQuantityChange(value, fieldListItem) {
    const productUnits = form.getFieldValue("productUnits");
    const updatedProductUnits = productUnits.map((productUnit, index) => {
      if (fieldListItem > 0 && index === fieldListItem) {
        return {
          ...productUnit,
          baseQuantity: value,
          originalPrice: roundUp(
            (productUnits[0].originalPrice * value) /
              productUnits[0].baseQuantity,
          ),
          sellingPrice: roundUp(
            (productUnits[0].sellingPrice * value) /
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

  return (
    <Form
      form={form}
      name="updateProductForm"
      onKeyDown={preventSubmission}
      onFinish={(submittedProduct) => {
        //Close the form modal
        setIsOpenModal(false);
        //Update the submitted product with product type, units, and isDefault
        submittedProduct.productType = productTypes.find(
          (productTypes) =>
            productTypes.productTypeId ===
            submittedProduct.productType.productTypeId,
        );
        submittedProduct.productUnits = submittedProduct.productUnits.map(
          (productUnit) => {
            return {
              ...productUnit,
              unit: units.find(
                (unit) => unit.unitId === productUnit.unit.unitId,
              ),
              isDefault:
                productUnit.isDefault === undefined
                  ? false
                  : productUnit.isDefault,
            };
          },
        );
        onFinish(submittedProduct);
      }}
      labelCol={{ span: 7 }}
    >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item label="Mã sản phẩm" name="productID">
            <Input className="w-[50%]" placeholder="Mã tự động" />
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
            label="Loại sản phẩm"
            name={["productType", "productTypeId"]}
            rules={[
              {
                required: true,
                message: "Hãy chọn loại sản phẩm",
              },
            ]}
          >
            <Select
              allowClear
              style={{ width: "60%" }}
              options={productTypes?.map((productType) => ({
                key: productType.productTypeId,
                value: productType.productTypeId,
                label: productType.productTypeName,
              }))}
            ></Select>
          </Form.Item>
          <Form.Item
            label="Tồn kho"
            name="stockQuantity"
            tooltip="Số lượng tồn kho tương ứng với đơn vị tính mặc định"
          >
            <InputNumber
              className="w-[30%]"
              min={0}
              max={1000000}
              defaultValue={0}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col span={24}>
          <Collapse
            size="small"
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
                                      name={[unitField.name, "unit", "unitId"]}
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
                                        formatter={(value) =>
                                          `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ",",
                                          )
                                        }
                                        parser={(value) =>
                                          value.replace(/\$\s?|(,*)/g, "")
                                        }
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
                                        formatter={(value) =>
                                          `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ",",
                                          )
                                        }
                                        parser={(value) =>
                                          value.replace(/\$\s?|(,*)/g, "")
                                        }
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
                                      <Checkbox>Mặc định</Checkbox>
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
    </Form>
  );
}

export default UpdateProductForm;
