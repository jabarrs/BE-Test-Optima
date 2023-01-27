import Profile from '../models/UserProfile.js';
import path from 'path';
import fs from 'fs';

export const getProfiles = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5;
    const offset = (page - 1) * limit;
    let sortBY = req.query.sortBY || 'name';
    let sort = req.query.sort || 'ASC';
    let searchParam = req.query.search || '';
    const response = await Profile.findAndCountAll({
      limit,
      offset,
      searchParam,
      sortBY,
      sort,
    });
    const {
      rows: [count],
    } = await Profile.findAndCountAll();
    const totalData = parseInt(count.count);
    const totalPage = Math.ceil(totalData / limit);
    const pagination = {
      currentPage: page,
      limit: limit,
      totalData: totalData,
      totalPage: totalPage,
    };
    pagination;
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const getProfileById = async (req, res) => {
  try {
    const response = await Profile.findOne({
      where: {
        id: req.params.id,
      },
    });
    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};
export const saveProfile = (req, res) => {
  if (req.files === null) return res.status(400).json({ message: 'No File Uploaded' });
  const userId = req.body.userId;
  const nik = req.body.nik;
  const gender = req.body.gender;
  const blood_type = req.body.blood_type;
  const full_name = req.body.full_name;
  const file = req.files.file;
  const fileSize = file.data.length;
  const ext = path.extname(file.name);
  const fileName = file.md5 + ext;
  const url = `${req.protocol}://${req.get('host')}/Images/${fileName}`;
  const allowedType = ['.png', '.jpg', '.jpeg'];

  if (nik.length > 16 || nik.length < 16) return res.status(422).json({ message: 'NIK must be 16 digits' });

  if (!(gender === 'male' || gender === 'female')) return res.status(422).json({ message: 'Invalid Gender' });

  if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: 'Invalid Images' });
  if (fileSize > 2000000) return res.status(422).json({ message: 'Image must be less than 2 MB' });

  file.mv(`./public/images/${fileName}`, async (err) => {
    if (err) return res.status(500).json({ message: err.message });
    try {
      await Profile.create({ userId: userId, nik: nik, gender: gender, blood_type: blood_type, full_name: full_name, photo: fileName, url: url });
      res.status(201).json({ message: 'User Created Successfully' });
    } catch (error) {
      console.log(error.message);
    }
  });
};
export const updateProfile = async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!profile) return res.status(404).json({ message: 'No Data Found' });
  let fileName = '';
  if (req.files === null) {
    fileName = Profile.photo;
  } else {
    const file = req.files.file;
    const fileSize = file.data.length;
    const ext = path.extname(file.name);
    fileName = file.md5 + ext;
    const allowedType = ['.png', '.jpg', '.jpeg'];

    if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ message: 'Invalid Images' });
    if (fileSize > 2000000) return res.status(422).json({ message: 'Image must be less than 2 MB' });

    const filepath = `./public/images/${profile.photo}`;
    fs.unlinkSync(filepath);

    file.mv(`./public/images/${fileName}`, (err) => {
      if (err) return res.status(500).json({ message: err.message });
    });
  }
  const userId = req.body.userId;
  const nik = req.body.nik;
  const gender = req.body.gender;
  const blood_type = req.body.blood_type;
  const full_name = req.body.full_name;
  const url = `${req.protocol}://${req.get('host')}/Images/${fileName}`;
  try {
    await Profile.update(
      { userId: userId, nik: nik, gender: gender, blood_type: blood_type, full_name: full_name, photo: fileName, url: url },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res.status(200).json({ message: 'Profile Updated Successfully' });
  } catch (error) {
    console.log(error.message);
  }
};
export const deleteProfile = async (req, res) => {
  const profile = await Profile.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!profile) return res.status(404).json({ message: 'No Data Found' });
  try {
    const filepath = `./public/images/${profile.photo}`;
    fs.unlinkSync(filepath);
    await Profile.destroy({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json({ message: 'Profile Deleted Successfully' });
  } catch (error) {
    console.log(error.message);
  }
};
