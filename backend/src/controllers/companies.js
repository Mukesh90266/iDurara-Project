const { success } = require("zod");
const { companiesSchema } = require("../validation/companies");
const Companies = require("../models/Companies");

const createCompanies = async (req, res) => {
  try {
    const body = req.body;
    const parsedBody = companiesSchema.safeParse(body);

    if (!parsedBody.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid data or missing data",
      });
    }

    const { name, contact, country, phone, email, website } = parsedBody.data;

    const isExists = await Companies.findOne({ email });
    if (isExists) {
      return res.status(400).json({
        success: false,
        message: "Company already exists",
      });
    }

    const payload = { name, email };
    if (contact) payload.contact = contact;
    if (country) payload.country = country;
    if (country) payload.country = country;
    if (website) payload.website = website;

    const newCompany = await Companies.createOne(payload);

    return res.status(200).json({
      success: true,
      data: newCompany,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to create company",
    });
  }
};

const getCompanies = async (req, res) => {
  try {
    const allCompanies = await Companies.find({});
    res.status(200).json({
      success: true,
      message: "All companies data fetch successfully",
      data: allCompanies,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to get companies data",
    });
  }
};

module.exports = {
    createCompanies,
    getCompanies
}