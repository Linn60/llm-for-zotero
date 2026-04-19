import { assert } from "chai";
import {
  getNextContentSourceMode,
  resolveDefaultPaperContentSourceMode,
} from "../src/modules/contextPanel/contexts/paperContextState";

describe("paperContextState", function () {
  it("defaults normal chat mode to pdf when MinerU is unavailable", function () {
    const mode = resolveDefaultPaperContentSourceMode({
      isWebChat: false,
      runtimeMode: "chat",
      hasMinerU: false,
    });

    assert.equal(mode, "pdf");
  });

  it("keeps MinerU as the default source in normal chat mode when available", function () {
    const mode = resolveDefaultPaperContentSourceMode({
      isWebChat: false,
      runtimeMode: "chat",
      hasMinerU: true,
    });

    assert.equal(mode, "mineru");
  });

  it("keeps agent mode on text when MinerU is unavailable", function () {
    const mode = resolveDefaultPaperContentSourceMode({
      isWebChat: false,
      runtimeMode: "agent",
      hasMinerU: false,
    });

    assert.equal(mode, "text");
  });

  it("cycles between pdf and text without MinerU", function () {
    assert.equal(getNextContentSourceMode("text", false), "pdf");
    assert.equal(getNextContentSourceMode("pdf", false), "text");
  });
});
