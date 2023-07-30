// translation
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Card, Col, Row, Form } from "react-bootstrap";
import { Formik } from "formik";
import Input from "components/formik/Input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSpinner, faTimes } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";
import axios from "axios";
import CustomSelectBox from "components/CustomSelectBox";
import { useSession } from "next-auth/client";

const userRoleOptions = [
  { name: "user", value: "3", label: "User" },
  { name: "Admin", value: "1", label: "Admin" },
];

const EditUser = ({
  id,
  handleModel,
  icon,
  editModel,
  modelButtonMsg,
  className,
  updateAssignedTable,
  updateUnassignedTable,
  onModelButtonClicked,
  GetAssignUsers,
}) => {
  const { t } = useTranslation("Management");
  const [data, setData] = useState({});
  const [aspID, setAspId] = useState("");
  const [loadingPage, setLoadingPage] = useState(true);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [userRoleKey, setUserRoleKey] = useState(null);

  const session = useSession();
  const userRole =
    session[0]?.user?.mongoRole?.toLowerCase() ||
    session[0]?.user?.user?.mongoRole?.toLowerCase() ||
    session[0]?.user?.user?.role;

  // get user data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const respond = await axios.get(
          `dashboard/management/users/data/${id}`
        );
        setData(respond.data?.user);
        updateUserRoleKey(respond.data?.user?.Role);
        setAspId(respond?.data?.user?.ASPNetUserID);
        setLoadingPage(false);
      } catch (error) {
        toast.error(error.response?.data?.message);
        setLoadingPage(false);
      }
    };
    fetchData();
  }, [id]);

  const updateUserRoleKey = (role) => {
    if (role === "Admin") {
      setUserRoleKey(1);
    } else if (role === "AccountManager") {
      setUserRoleKey(2);
    } else if (role === "User") {
      setUserRoleKey(3);
    } else if (role === "Sales") {
      setUserRoleKey(4);
    } else if (role === "AccountAdmin") {
      setUserRoleKey(5);
    } else if (role === "Reporting") {
      setUserRoleKey(6);
    }
  };

  const initialValues = {
    FirstName: data?.FirstName || "",
    LastName: data?.LastName || "",
    UserName: data?.UserName || "",
    Email: data?.Email || "",
    PhoneNumber: data?.PhoneNumber || "",
  };

  const handleChange = (e) => {
    setUserRoleKey(e.target.value);
  };

  const onSubmit = async (data) => {
    const submitData = {
      ...data,
      Role: userRoleKey ? +userRoleKey : null,
    };

    if (
      submitData.FirstName &&
      submitData.LastName &&
      submitData.Email &&
      submitData.UserName &&
      submitData.PhoneNumber
    ) {
      setLoading(true);
      try {
        const respond = await axios.put(
          `dashboard/management/users/data/${aspID}`,
          submitData
        );
        toast.success(respond?.data?.message);
        GetAssignUsers();
        setLoading(false);
        if (editModel) {
          handleModel();
        }
      } catch (error) {
        toast.error(error.response?.data?.error || "Something Went Wrong");
        setLoading(false);
      }
    } else {
      toast.error("please fill all fields");
    }
  };

  return (
    <div className="container-fluid">
      {loadingPage && <h3 className="text-center pt-5 pb-5">loading...</h3>}
      {!loadingPage && (
        <Card>
          {!editModel && (
            <Card.Header className="h3">
              {t("Update_User_Information")}
            </Card.Header>
          )}
          <Card.Body>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {(formik) => {
                return (
                  <Form onSubmit={formik.handleSubmit}>
                    <Row>
                      <Col md="6">
                        <Input
                          placeholder={t("First_Name")}
                          label={t("First_Name")}
                          name="FirstName"
                          type="text"
                          className={"col-12 col-md-6 col-lg-8 mb-3"}
                        />
                      </Col>
                      <Col md="6">
                        <Input
                          placeholder={t("Last_Name")}
                          label={t("Last_Name")}
                          name="LastName"
                          type="text"
                          className={"col-12 col-md-6 col-lg-8 mb-3"}
                        />
                      </Col>
                      <Col md="6">
                        <Input
                          placeholder={t("User_Name")}
                          label={t("User_Name")}
                          name="UserName"
                          type="text"
                          className={"col-12 col-md-6 col-lg-8 mb-3"}
                        />
                      </Col>
                      <Col md="6">
                        <Input
                          placeholder={t("Email")}
                          label={t("Email")}
                          name="Email"
                          type="email"
                          className={"col-12 col-md-6 col-lg-8 mb-3"}
                        />
                      </Col>
                      <Col md="6">
                        <Input
                          placeholder={t("Phone_Number")}
                          label={t("Phone_Number")}
                          name="PhoneNumber"
                          type="text"
                          className={"col-12 col-md-6 col-lg-8 mb-3"}
                        />
                      </Col>

                      {userRole == "support" && (
                        <Col md="6">
                          <CustomSelectBox
                            name={t("AccountType")}
                            Label={t("Account Type")}
                            ClassN={"col-12 col-md-6 col-lg-8"}
                            value={
                              userRoleKey === 1 || userRoleKey === 3
                                ? userRoleKey
                                : null
                            }
                            handleChange={handleChange}
                            Options={userRoleOptions}
                          />
                        </Col>
                      )}
                    </Row>

                    <div className="w-100 d-flex flex-wrap flex-md-nowrap">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="px-3 py-2 text-nowrap me-3 ms-0  mb-2 mb-md-0"
                      >
                        {!loading ? (
                          <FontAwesomeIcon
                            className="mx-2"
                            icon={faCheck}
                            size="sm"
                          />
                        ) : (
                          <FontAwesomeIcon
                            className="mx-2 fa-spin"
                            icon={faSpinner}
                            size="sm"
                          />
                        )}
                        {t("save")}
                      </Button>
                      <Button
                        className="px-3 py-2 text-nowrap me-3 ms-0"
                        onClick={() => {
                          handleModel();
                        }}
                      >
                        <FontAwesomeIcon
                          className="mx-2"
                          icon={faTimes}
                          size="sm"
                        />
                        {t("cancel")}
                      </Button>
                    </div>
                  </Form>
                );
              }}
            </Formik>

            {/* <div className="mt-5 d-flex justify-content-end">
                  <button className="btn btn-primary px-3 py-2 ms-3">
                    <FontAwesomeIcon
                      className="me-2"
                      icon={faCheck}
                      size="sm"
                    />
                    {t("Submit")}
                  </button>
                  <button className="btn btn-primary px-3 py-2 ms-3">
                    <FontAwesomeIcon
                      className="me-2"
                      icon={faTimes}
                      size="sm"
                    />
                    {t("Cancel")}
                  </button>
                </div> */}
          </Card.Body>
        </Card>
      )}
    </div>
  );
};
export default EditUser;

// translation ##################################
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["Management", "main"])),
    },
  };
}
// translation ##################################
