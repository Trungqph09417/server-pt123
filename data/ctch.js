// await db.Attribute.create({
//   id: attributesId,
//   price: item?.header?.attribute?.price,
//   acreage: item?.header?.attribute?.acreage,
//   published: item?.header?.attribute?.published,
//   hashtag: item?.header?.attribute?.hashtag,
// });
// await db.Image.create({
//   id: imagesId,
//   image: JSON.stringify(item?.images),
// });
// await db.Label.create({
//   code: labalCode,
//   value: item?.header?.class?.classType,
// });
// await db.Overview.create({
//   id: overviewId,
//   code: item?.overContent?.overviewContent.find(
//     (i) => i.name === "Mã tin:"
//   )?.content,
//   area: item?.overContent?.overviewContent.find(
//     (i) => i.name === "Khu vực"
//   )?.content,
//   type: item?.overContent?.overviewContent.find(
//     (i) => i.name === "Loại tin rao:"
//   )?.content,
//   target: item?.overContent?.overviewContent.find(
//     (i) => i.name === "Đối tượng thuê:"
//   )?.content,
//   created: item?.overContent?.overviewContent.find(
//     (i) => i.name === "Ngày đăng:"
//   )?.content,
//   expire: item?.overContent?.overviewContent.find(
//     (i) => i.name === "Ngày hết hạn:"
//   )?.content,
//   bonus: item?.overContent?.overviewContent.find(
//     (i) => i.name === "Gói tin:"
//   )?.content,
// });
// await db.User.create({
//   id: userId,
//   name: item?.postContact?.inforContent.find(
//     (i) => i.name === "Liên hệ:"
//   )?.content,
//   password: hashPassword("123456"),
//   phone: item?.postContact?.inforContent.find(
//     (i) => i.name === "Điện thoại:"
//   )?.content,
//   zalo: item?.postContact?.inforContent.find((i) => i.name === "Zalo")
//     ?.content,
// });
