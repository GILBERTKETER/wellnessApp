import React from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import { Card, Text, Title, Paragraph } from 'react-native-paper';

type BlogPageSectionProps = {
    selectedCategory: string;
    searchQuery: string;
};

const BlogPageSection: React.FC<BlogPageSectionProps> = ({ selectedCategory, searchQuery }) => {
    const blogs = [
        {
            id: '1',
            title: 'How I Cured Cold with Homemade Remedies',
            description:
                'Discover how natural ingredients can alleviate cold symptoms effectively without the use of strong medications. This remedy focuses on boosting immunity and soothing discomfort.',
            image: 'https://picsum.photos/700/400?random=1',
            category: 'Healthy Lifestyle',
        },
        {
            id: '2',
            title: 'How to Quit Bad Behaviors',
            description:
                'Breaking bad habits can be challenging, but with the right strategies and mindset, you can achieve a healthier and more fulfilling lifestyle. Find out how!',
            image: 'https://picsum.photos/700/400?random=2',
            category: 'Bad Habits',
        },
        {
            id: '3',
            title: 'Top 10 Foods for a Healthy Heart',
            description:
                'Learn about the best foods to keep your heart in great shape. These superfoods are packed with nutrients to promote cardiovascular health.',
            image: 'https://picsum.photos/700/400?random=3',
            category: 'Healthy Lifestyle',
        },
    ];

    // Filter blogs based on selected category and search query
    const filteredBlogs = blogs.filter(
        (blog) =>
            (selectedCategory === 'All' || blog.category === selectedCategory) &&
            blog.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Text style={styles.header}>Healthy Living Blog</Text>
                {filteredBlogs.map((blog) => (
                    <Card key={blog.id} style={styles.card}>
                        <Card.Cover source={{ uri: blog.image }} />
                        <Card.Content>
                            <Title style={styles.title}>{blog.title}</Title>
                            <Paragraph
                                numberOfLines={3}
                                ellipsizeMode="tail"
                                style={styles.description}
                            >
                                {blog.description}
                            </Paragraph>
                        </Card.Content>
                        <Card.Actions>
                            <TouchableOpacity style={styles.readMoreButton}>
                                <Text style={styles.readMoreText}>Read More</Text>
                            </TouchableOpacity>
                        </Card.Actions>
                    </Card>
                ))}
                {filteredBlogs.length === 0 && (
                    <View style={styles.noBlogsContainer}>
                        <Text style={styles.noBlogsText}>No blogs found for the selected filters.</Text>
                    </View>
                )}
            </ScrollView>
         </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginVertical: 16,
        textAlign: 'center',
    },
    card: {
        marginBottom: 16,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        fontSize: 14,
        color: '#555',
    },
    readMoreButton: {
        backgroundColor: '#333',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
        alignItems: 'center',
    },
    readMoreText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    noBlogsContainer: {
        marginTop: 20,
        alignItems: 'center',
    },
    noBlogsText: {
        fontSize: 16,
        color: '#888',
    },
});

export default BlogPageSection;
