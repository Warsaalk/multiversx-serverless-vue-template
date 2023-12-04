export const CSP = {
	DIRECTIVES: {
		// Fetch directives
		DefaultSrc: "default-src",
		ChildSrc: "child-src",
		ConnectSrc: "connect-src",
		FontSrc: "font-src",
		FrameSrc: "frame-src",
		ImgSrc: "img-src",
		ManifestSrc: "manifest-src",
		MediaSrc: "media-src",
		ObjectSrc: "object-src",
		PrefetchSrc: "prefetch-src",
		ScriptSrc: "script-src",
		ScriptSrcElem: "script-src-elem",
		ScriptSrcAttr: "script-src-attr",
		StyleSrc: "style-src",
		StyleSrcElem: "style-src-elem",
		StyleSrcAttr: "style-src-attr",
		WorkerSrc: "worker-src",

		// Document directives
		BaseUri: "base-uri",
		Sandbox: "sandbox",

		// Navigation directives
		FormAction: "form-action",
		FrameAncestors: "frame-ancestors",
		NavigateTo: "navigate-to",

		// Reporting directives
		ReportTo: "report-to",

		// Other directives
		TrustedTypes: "trusted-types",
		UpgradeInsecureRequests: "upgrade-insecure-requests",
	}
};