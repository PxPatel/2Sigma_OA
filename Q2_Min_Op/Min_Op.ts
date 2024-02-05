/**
 *
 * @param n
 * @returns number of addition or subtraction operations needed to reduce a number to 0 using only powers of 2
 */

export function getMinOperations(n: number) {
  let bin = n.toString(2);

  //Fill in gaps between clusters
  /**
   * Cluster = Consecutive 1s, both in consecutive groups and isolated
   *
   * If the gap between ones is 1, then fill it in with 1s
   * Only if atleast one of two parties is of size >= 2
   *
   * End with full clusters of 1s
   */

  let { numOperations, clusters } = fillClusters(bin);

  //Get remaining operations by counting clusters and isolated 1s
  /**
   * If clusters +2
   * If single one, +1
   */
  let ans = numOperations + countSetsOf1s(clusters);
  return ans;
}

/**
 *
 * @param bin string representation of a binary string
 * @returns number of operations performed and modified clusters array
 * @description Fill in gaps between clusters
 * Only if Gap between cluster is 1 and atleast of the adjecent cluster has width >= 2, fill it in  with 1
 *
 */
function fillClusters(bin: string) {
  let numOperations = 0;
  let clusters = getClustersOfOnes(bin);

  let i = 0;
  while (i < clusters.length - 1) {
    let cluster1 = clusters[i];
    let cluster2 = clusters[i + 1];

    if (
      (cluster1.width > 1 || cluster2.width > 1) &&
      cluster2.start - cluster1.end === 2
    ) {
      numOperations++;

      clusters[i + 1] = {
        start: cluster1.start,
        end: cluster2.end,
        width: cluster1.width + cluster2.width + 1,
      };

      clusters.splice(i, 1);
    } else {
      i++;
    }
  }

  let j = clusters.length - 1;
  while (j >= 1) {
    let cluster1 = clusters[j];
    let cluster2 = clusters[j - 1];

    if (
      (cluster1.width > 1 || cluster2.width > 1) &&
      cluster1.start - cluster2.end === 2
    ) {
      numOperations++;

      clusters[i - 1] = {
        start: cluster2.start,
        end: cluster1.end,
        width: cluster1.width + cluster2.width + 1,
      };

      clusters.splice(i, 1);
    }
    j--;
  }

  return { numOperations, clusters };
}

/**
 *
 * @param remainingClusters
 * @returns number of operations needed to reduce a cluster array to a value of 0
 * @description Normalize and sum clusters based on width
 * If width of cluster is 1, add 1, otherwise 2
 */
function countSetsOf1s(
  remainingClusters: {
    start: number;
    end: number;
    width: number;
  }[]
) {
  // console.log(remainingClusters);

  let operations = 0;
  remainingClusters.forEach((cluster) => {
    if (cluster.width > 1) {
      operations += 2;
    } else {
      operations++;
    }
  });

  return operations;
}

/**
 * 
 * @param binaryRepresentation 
 * @returns 
 * {
    start: number;
    end: number;
    width: number;
  }[]

  @description Find and group consecutives 1s in a binary string, called clusters. 
  Each cluster in the array will have starting and ending position, based on a 0-start index
  Width defines the number of 1s in that clusters. If starting and ending index are the same, then width is of one 
 */
function getClustersOfOnes(binaryRepresentation: string) {
  let clusters: {
    start: number;
    end: number;
    width: number;
  }[] = [];
  let startRef: number = -1;

  for (let i = 0; i < binaryRepresentation.length; i++) {
    if (binaryRepresentation[i] === "1") {
      if (startRef === -1) {
        startRef = i;
      }
    } else {
      if (startRef !== -1 && i - startRef >= 1) {
        clusters.push({
          start: startRef,
          end: i - 1,
          width: i - startRef,
        });
      }
      startRef = -1;
    }
  }

  if (startRef !== -1 && binaryRepresentation.length - startRef >= 1) {
    clusters.push({
      start: startRef,
      end: binaryRepresentation.length - 1,
      width: binaryRepresentation.length - startRef,
    });
    startRef = -1;
  }

  return clusters;
}
