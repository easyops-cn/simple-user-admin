import { Storyboard } from "@easyops/brick-types";

const storyboard: Storyboard = {
  imports: [
    "@bricks/basic-bricks",
    "@bricks/container-brick",
    "@bricks/presentational-bricks",
    "@bricks/user-admin",
    "@bricks/forms"
  ],
  app: { name: "用户管理", id: "user-admin", homepage: "/user-admin" },
  routes: [
    {
      path: "${APP.homepage}",
      exact: true,
      redirect: "${APP.homepage}/faker/list"
    },
    {
      path: "${APP.homepage}/faker/list",
      providers: ["user-admin.provider-faker-list"],
      exact: true,
      menu: {
        breadcrumb: { items: [{ text: "Faker List" }] },
        sidebarMenu: {
          title: "用户管理",
          menuItems: [
            { text: "用户列表（鉴权例子）", to: "/user-admin/user/list" }
          ]
        }
      },
      bricks: [
        {
          brick: "basic-bricks.micro-view",
          properties: { pageTitle: "Faker List" },
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "basic-bricks.general-card",
                  slots: {
                    content: {
                      type: "bricks",
                      bricks: [
                        {
                          brick: "container-brick.search-bar",
                          slots: {
                            start: {
                              type: "bricks",
                              bricks: [
                                {
                                  brick: "user-admin.ticking-time"
                                },
                                {
                                  brick: "forms.general-checkbox",
                                  properties: {
                                    options: ["暂停"]
                                  },
                                  events: {
                                    "general.checkbox.change": {
                                      target: "user-admin\\.ticking-time",
                                      properties: {
                                        isPause: "${EVENT.detail|includes:暂停}"
                                      }
                                    }
                                  }
                                }
                              ]
                            },
                            end: {
                              type: "bricks",
                              bricks: [
                                {
                                  brick: "basic-bricks.general-button",
                                  properties: {
                                    buttonType: "primary",
                                    buttonIcon: "reload"
                                  },
                                  events: {
                                    "general.button.click": {
                                      target:
                                        "user-admin\\.provider-faker-list",
                                      method: "execute",
                                      callback: {
                                        success: {
                                          target:
                                            "presentational-bricks\\.brick-table",
                                          properties: {
                                            dataSource: "${EVENT.detail}"
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        },
                        {
                          brick: "presentational-bricks.brick-table",
                          lifeCycle: {
                            useResolves: [
                              {
                                provider: "user-admin\\.provider-faker-list",
                                name: "dataSource"
                              }
                            ]
                          },
                          properties: {
                            showCard: false,
                            columns: [
                              { title: "姓", dataIndex: "firstname" },
                              { title: "名", dataIndex: "lastname" },
                              { title: "邮箱", dataIndex: "email" },
                              { title: "手机", dataIndex: "phone" },
                              { title: "国家", dataIndex: "address.country" },
                              { title: "城市", dataIndex: "address.city" },
                              { title: "街道", dataIndex: "address.street" },
                              {
                                title: "邮政编码",
                                dataIndex: "address.postcode"
                              }
                            ]
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    },
    {
      path: "/user-admin/user/list",
      exact: true,
      menu: {
        breadcrumb: {
          items: [
            { text: "Faker List", to: "${APP.homepage}/faker/list" },
            { text: "User List (鉴权)" }
          ]
        },
        sidebarMenu: { title: "用户管理", menuItems: [] }
      },
      bricks: [
        {
          brick: "basic-bricks.micro-view",
          properties: { pageTitle: "用户列表" },
          slots: {
            toolbar: {
              type: "bricks",
              bricks: [
                {
                  brick: "basic-bricks.general-button",
                  properties: { buttonName: "新建", buttonIcon: "plus" },
                  events: {
                    "general.button.click": {
                      action: "history.push",
                      args: ["${APP.homepage}/create"]
                    }
                  }
                }
              ]
            },
            content: {
              type: "bricks",
              bricks: [
                { brick: "user-admin.provider-user-list", bg: true },
                {
                  brick: "presentational-bricks.brick-table",
                  lifeCycle: {
                    useResolves: [
                      {
                        provider: "user-admin\\.provider-user-list",
                        name: "dataSource"
                      }
                    ]
                  },
                  properties: {
                    columns: [
                      { title: "名称", dataIndex: "name" },
                      { title: "年龄", dataIndex: "age" },
                      { title: "地址", dataIndex: "address" },
                      {
                        title: "状态",
                        dataIndex: "valid",
                        useBrick: {
                          brick: "presentational-bricks.brick-value-mapping",
                          transformFrom: "cellData",
                          transform: "value",
                          properties: {
                            mapping: {
                              true: { text: "在职", color: "green" },
                              false: { text: "离职", color: "red" }
                            }
                          }
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        }
      ]
    },
    {
      path: "${APP.homepage}/create",
      exact: true,
      menu: {
        sidebarMenu: { title: "用户管理", menuItems: [] },
        breadcrumb: { items: [{ text: "新建" }] }
      },
      bricks: [
        {
          brick: "basic-bricks.micro-view",
          slots: {
            content: {
              type: "bricks",
              bricks: [
                {
                  brick: "basic-bricks.general-card",
                  properties: { configProps: { title: "新建用户" } },
                  slots: {
                    content: {
                      type: "bricks",
                      bricks: [
                        {
                          brick: "user-admin.provider-create-user",
                          bg: true,
                          events: {
                            "response.success": {
                              action: "history.push",
                              args: ["${APP.homepage}"]
                            }
                          }
                        },
                        {
                          brick: "forms.general-form",
                          events: {
                            "validate.success": {
                              target: "user-admin\\.provider-create-user",
                              method: "setArgsAndExecute",
                              args: [{ "0": "${event.detail}" }]
                            },
                            "validate.error": {
                              action: "console.warn",
                              args: ["${EVENT.type}", "${EVENT.detail}"]
                            }
                          },
                          slots: {
                            items: {
                              type: "bricks",
                              bricks: [
                                {
                                  brick: "forms.general-input",
                                  properties: {
                                    name: "name",
                                    label: "名称",
                                    placeholder: "请输入名称",
                                    required: true
                                  }
                                },
                                {
                                  brick: "forms.general-input-number",
                                  properties: {
                                    name: "age",
                                    label: "年龄",
                                    placeholder: "请输入年龄",
                                    inputBoxStyle: { width: "100%" },
                                    required: false
                                  }
                                },
                                {
                                  brick: "forms.general-input",
                                  properties: {
                                    name: "address",
                                    label: "地址",
                                    placeholder: "请输入地址"
                                  }
                                },
                                {
                                  brick: "forms.general-buttons",
                                  properties: {
                                    showCancelButton: true,
                                    submitText: "提交",
                                    cancelText: "取消"
                                  },
                                  events: {
                                    "submit.button.click": {
                                      action: "console.log"
                                    },
                                    "cancel.button.click": {
                                      action: "history.push",
                                      args: ["${APP.homepage}"]
                                    }
                                  }
                                }
                              ]
                            }
                          }
                        }
                      ]
                    }
                  }
                }
              ]
            }
          }
        }
      ]
    }
  ]
};

export default storyboard;
