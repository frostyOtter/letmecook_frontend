import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { imageLinks } from "@/components/imageLinks";
import { Image } from "@nextui-org/image";
import { Card, CardBody, CardFooter } from "@nextui-org/card";
import { Skeleton } from "@nextui-org/skeleton";
// import { Textarea } from "@nextui-org/input";
import axios from "axios";
import DefaultLayout from "@/layouts/default";
import { SearchResult } from "@/types";
import { Spacer } from "@nextui-org/spacer";
import { CustomCard } from "@/components/CustomCard";
import ResultModal from "@/components/ResultModal";

export default function SearchPage() {
    const location = useLocation();
    const { searchQuery } = location.state as { searchQuery: string };
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const backend_url = import.meta.env.VITE_BACKEND_URI;

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await axios.post(`${backend_url}/search_multi_features`, {
                    user_input: searchQuery,
                }, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                });

                const results = response.data.slice(0, 10);
                // Sort results so that those with null image links are at the back
                const sortedResults = results.sort((a: SearchResult, b: SearchResult) => {
                    const aImageLink = getImageLink(a._source.images);
                    const bImageLink = getImageLink(b._source.images);
                    if (aImageLink && !bImageLink) return -1;
                    if (!aImageLink && bImageLink) return 1;
                    return 0;
                });
                setSearchResults(sortedResults);
            } catch (error) {
                if (axios.isAxiosError(error) && error.response) {
                    setError(`HTTP error! Status: ${error.response.status}`);
                } else {
                    setError('No results found. :(');
                }
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchSearchResults();
        }
    }, [searchQuery]);

    const handleCardClick = (result: SearchResult) => {
        setSelectedResult(result);
        setIsModalOpen(true);
    };

    const getImageLink = (imageName: string) => {
        const image = imageLinks.find((img) => img.name === imageName);
        return image ? image.link : null;
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedResult(null);
    };

    if (loading) {
        return (
            <DefaultLayout>
                <div className="gap-2 grid grid-cols-1 sm:grid-cols-3">
                    {Array.from({ length: 3 }).map((_, index) => (
                        <Card key={index} className="w-[200px] space-y-5 p-4" radius="lg">
                            <Skeleton className="rounded-lg">
                                <div className="h-24 rounded-lg bg-default-300"></div>
                            </Skeleton>
                            <div className="space-y-3">
                                <Skeleton className="w-3/5 rounded-lg">
                                    <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-4/5 rounded-lg">
                                    <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
                                </Skeleton>
                                <Skeleton className="w-2/5 rounded-lg">
                                    <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
                                </Skeleton>
                            </div>
                        </Card>
                    ))}
                </div>
            </DefaultLayout>
        );
    }

    if (error) {
        return (
            <DefaultLayout>
                <div>Error: {error}</div>
                <div className="flex p-5">
                    <CustomCard />
                    <Spacer x={4} />
                    <CustomCard />
                    <Spacer x={4} />
                    <CustomCard />
                </div>
            </DefaultLayout>
        );
    }

    return (
        <DefaultLayout>
            <div className="flex flex-col gap-12">
                <h1 className="text-3xl font-bold text-center">Search Results</h1>
                {searchResults.length > 0 ? (
                    <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
                        {searchResults.map((result, index) => (
                            <Card shadow="sm" key={index} isPressable onPress={() => handleCardClick(result)}>
                                <CardBody className="overflow-visible p-0">
                                    {getImageLink(result._source.images) ? (
                                        <Image
                                            shadow="sm"
                                            radius="lg"
                                            width="100%"
                                            alt={result._source.title}
                                            className="w-full object-cover h-[140px]"
                                            src={getImageLink(result._source.images) as string}
                                        />
                                    ) : (
                                        <Skeleton className="rounded-lg">
                                            <div className="h-[140px] rounded-lg bg-default-300"></div>
                                        </Skeleton>
                                    )}
                                </CardBody>
                                <CardFooter className="text-small justify-between">
                                    <b>{result._source.title}</b>
                                    <p className="text-default-500">{result._source.time}</p>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                ) : (
                    <div>Sorry, not found</div>
                )}
                {selectedResult && (
                    <ResultModal
                        isOpen={isModalOpen}
                        onClose={closeModal}
                        title={selectedResult._source.title}
                        image={getImageLink(selectedResult._source.images) || ''}
                        time={selectedResult._source.time}
                        cook={selectedResult._source.cook}
                    />
                )}
            </div>
        </DefaultLayout>
    );
}


// import { useLocation } from "react-router-dom";
// import { useState, useEffect } from "react";
// import { imageLinks } from "@/components/imageLinks";
// import { Image } from "@nextui-org/image";
// import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
// import { Skeleton } from "@nextui-org/skeleton";
// import { Textarea } from "@nextui-org/input";
// import axios from "axios";
// import DefaultLayout from "@/layouts/default";
// import { SearchResult } from "@/types";
// import { Spacer } from "@nextui-org/spacer";
// import { CustomCard } from "@/components/CustomCard";

// export default function SearchPage() {
//     const location = useLocation();
//     const { searchQuery } = location.state as { searchQuery: string };
//     const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
//     const [loading, setLoading] = useState<boolean>(true);
//     const [error, setError] = useState<string | null>(null);
//     const [selectedResult, setSelectedResult] = useState<SearchResult | null>(null);
//     const backend_url = import.meta.env.VITE_BACKEND_URI;
//     useEffect(() => {
//         const fetchSearchResults = async () => {
//             try {
//                 const response = await axios.post(`${backend_url}/search_multi_features`, {
//                     user_input: searchQuery,
//                 }, {
//                     headers: {
//                         "Content-Type": "application/json",
//                     },
//                 });

//                 const results = response.data.slice(0, 10);
//                 // Sort results so that those with null image links are at the back
//                 const sortedResults = results.sort((a: SearchResult, b: SearchResult) => {
//                     const aImageLink = getImageLink(a._source.images);
//                     const bImageLink = getImageLink(b._source.images);
//                     if (aImageLink && !bImageLink) return -1;
//                     if (!aImageLink && bImageLink) return 1;
//                     return 0;
//                 });
//                 setSearchResults(sortedResults);
//             } catch (error) {
//                 if (axios.isAxiosError(error) && error.response) {
//                     setError(`HTTP error! Status: ${error.response.status}`);
//                 } else {
//                     setError('No results found. :(');
//                 }
//             } finally {
//                 setLoading(false);
//             }
//         };

//         if (searchQuery) {
//             fetchSearchResults();
//         }
//     }, [searchQuery]);

//     const handleCardClick = (result: SearchResult) => {
//         setSelectedResult(result);
//     };

//     const getImageLink = (imageName: string) => {

//         const image = imageLinks.find((img) => img.name === imageName);
//         return image ? image.link : null;
//     }

//     if (loading) {
//         return (
//             <DefaultLayout>
//                 <div className="gap-2 grid grid-cols-1 sm:grid-cols-3">
//                     {Array.from({ length: 3 }).map((_, index) => (
//                         <Card key={index} className="w-[200px] space-y-5 p-4" radius="lg">
//                             <Skeleton className="rounded-lg">
//                                 <div className="h-24 rounded-lg bg-default-300"></div>
//                             </Skeleton>
//                             <div className="space-y-3">
//                                 <Skeleton className="w-3/5 rounded-lg">
//                                     <div className="h-3 w-3/5 rounded-lg bg-default-200"></div>
//                                 </Skeleton>
//                                 <Skeleton className="w-4/5 rounded-lg">
//                                     <div className="h-3 w-4/5 rounded-lg bg-default-200"></div>
//                                 </Skeleton>
//                                 <Skeleton className="w-2/5 rounded-lg">
//                                     <div className="h-3 w-2/5 rounded-lg bg-default-300"></div>
//                                 </Skeleton>
//                             </div>
//                         </Card>
//                     ))}
//                 </div>
//             </DefaultLayout>
//         );
//     }

//     if (error) {
//         return (
//             <DefaultLayout>
//                 <div>Error: {error}</div>
//                 <div className="flex p-5">
//                     <CustomCard />
//                     <Spacer x={4} />
//                     <CustomCard />
//                     <Spacer x={4} />
//                     <CustomCard />
//                 </div>
//             </DefaultLayout>
//         );
//     }

//     return (
//         <DefaultLayout>
//             <div className="flex flex-col gap-12">
//                 <h1 className="text-3xl font-bold text-center">Search Results</h1>
//                 {searchResults.length > 0 ? (
//                     <div className="gap-2 grid grid-cols-2 sm:grid-cols-4">
//                         {searchResults.map((result, index) => (
//                             <Card shadow="sm" key={index} isPressable onPress={() => handleCardClick(result)}>
//                                 <CardBody className="overflow-visible p-0">
//                                     {getImageLink(result._source.images) ? (
//                                         <Image
//                                             shadow="sm"
//                                             radius="lg"
//                                             width="100%"
//                                             alt={result._source.title}
//                                             className="w-full object-cover h-[140px]"
//                                             src={getImageLink(result._source.images) as string}
//                                         />
//                                     ) : (
//                                         <Skeleton className="rounded-lg">
//                                             <div className="h-[140px] rounded-lg bg-default-300"></div>
//                                         </Skeleton>
//                                     )}
//                                 </CardBody>
//                                 <CardFooter className="text-small justify-between">
//                                     <b>{result._source.title}</b>
//                                     <p className="text-default-500">{result._source.time}</p>
//                                 </CardFooter>
//                             </Card>
//                         ))}
//                     </div>
//                 ) : (
//                     <div>Sorry, not found</div>
//                 )}
//                 {selectedResult && (
//                     <Card className="py-4">
//                         <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
//                             <h2 className="font-bold text-large">{selectedResult._source.title}</h2>
//                         </CardHeader>
//                         <CardBody className="overflow-visible py-2">
//                             {getImageLink(selectedResult._source.images) ? (
//                                 <Image
//                                     alt="Card background"
//                                     className="object-cover rounded-xl w-full h-auto max-h-[50vh]"
//                                     src={getImageLink(selectedResult._source.images) as string}
//                                 />
//                             ) : (
//                                 <Skeleton className="rounded-lg">
//                                     <div className="h-[200px] rounded-lg bg-default-300"></div>
//                                 </Skeleton>
//                             )}
//                         </CardBody>
//                         <CardFooter>
//                             <Textarea
//                                 isReadOnly
//                                 label="Tutorial"
//                                 variant="bordered"
//                                 labelPlacement="outside"
//                                 placeholder="Enter your description"
//                                 defaultValue={selectedResult._source.cook}
//                                 className="max-w-xs"
//                             />
//                         </CardFooter>
//                     </Card>
//                 )}
//             </div>
//         </DefaultLayout>
//     );
// }

