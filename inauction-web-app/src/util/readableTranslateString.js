import IntlMessages from "util/IntlMessages";
import React from "react";

export function readableTranslateString (string) {
  return <IntlMessages id={string} />;
}
