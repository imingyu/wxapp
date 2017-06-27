/**
 * wxml转html
 * @author imingyu<mingyuhisoft@163.com>
 * @date 2017-6-27
 */
import { each, extend } from './util.js';
import toObject from './object.js';
import { defaultTransformOptions } from './options.js';


var propStringify = (props) => {
    var html = "";
    each(props, (value, prop) => {
        html += ` ${prop}="${value}"`;
    });
    return html;
}

var childrenStringify = (children, options) => {
    return (children || []).map(item => {
        return toHtml(item, options);
    }).join('');
}

var createElement = (tagName, propsStr, innerHtml) => {
    return `<${tagName}${propsStr}>${innerHtml}</${tagName}>`;
}

var toHtml = (elementSpec, options) => {
    if (typeof elementSpec === 'string') return elementSpec;
    var elementHtml = "",
        wxmlTagName = elementSpec.tag;
    if (options.mapping && options.mapping[wxmlTagName]) {
        var transform = options.mapping[wxmlTagName];
        if (typeof transform === 'string') {
            elementHtml += createElement(transform, propStringify(elementSpec.props), childrenStringify(elementSpec.children, options));
        } else if (typeof transform === 'function') {
            elementHtml += transform(elementSpec);
        } else {
            elementHtml += createElement(wxmlTagName, propStringify(elementSpec.props), childrenStringify(elementSpec.children, options));
        }
    } else {
        elementHtml += createElement(wxmlTagName, propStringify(elementSpec.props), childrenStringify(elementSpec.children, options));
    }
    return elementHtml;
}

export default (wxmlContent, options) => {
    options = options || {};
    options = extend(true, {}, defaultTransformOptions, options);
    var html = "",
        wxmlObject = toObject(wxmlContent);
    each(wxmlObject, item => {
        html += toHtml(item, options);
    });
    return html;
};