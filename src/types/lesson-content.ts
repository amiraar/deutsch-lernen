export type LessonContentExample = {
	german: string;
	indonesian: string;
	note?: string;
};

export type LessonContentSection = {
	title: string;
	explanation: string;
	examples: LessonContentExample[];
	culturalNote?: {
		title: string;
		content: string;
	};
	tip?: string;
};

export type LessonContent = {
	topic: string;
	introduction: string;
	sections: LessonContentSection[];
	summary: string[];
};
