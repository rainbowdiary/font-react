import React, { Component } from 'react';
import { uploadFile } from '../../api';
import { Upload, message } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
const { Dragger } = Upload;

export default class UploadC extends Component {
  render() {
    const props = {
      name: 'file',  //发送到后台的文件参数名
      multiple: true, //是否支持多选文件，
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76', //上传的地址
      onChange(info) { //	上传文件改变时的状态，详见 onChange
        console.log('info文件详情', info);//上传文件的详情 {file:{}}
        const { status } = info.file;
        if (status !== 'uploading') {
          console.log('info.file', info.file, info.fileList);
        }
        if (status === 'done') {
          message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
      beforeUpload(file) {
        console.log('beforeUpload', file);
        // 文件切片方法
        function slice(file, piece = 1024 * 1024 * 5) {
          let totalSize = file.size; // 文件总大小
          let start = 0; // 每次上传的开始字节
          let end = start + piece; // 每次上传的结尾字节
          let chunks = []
          while (start < totalSize) {
            // 根据长度截取每次需要上传的数据
            // File对象继承自Blob对象，因此包含slice方法
            let blob = file.slice(start, end);
            chunks.push(blob)

            start = end;
            end = start + piece;
          }
          return chunks
        }
        const LENGTH = 1024 * 1024 * 0.1;
        let chunks = slice(file, LENGTH); // 首先拆分切片
        console.log('chunks', chunks);
        // 将切片上传到服务器
        chunks.forEach(async (chunk) => {
          let fd = new FormData();
          fd.append("file", chunk);
          console.log('fd', fd);
          // 发送 POST 请求username, password
          const resBody = await uploadFile({ fd });
          console.log('resBody', resBody);
        })
      }
    };
    return (<div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
    </p>
      </Dragger>
    </div>)
  }
}


